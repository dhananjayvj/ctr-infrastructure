/**
 * AWS EC2 Deployment Service
 * 
 * Handles deployment of static sites to EC2 instances using
 * the same patterns as the main storezy platform:
 * - SSH-based file transfer (SCP)
 * - PM2 process management
 * - Zero-downtime deployments
 * 
 * This module provides programmatic access to the deployment
 * workflow that is typically run via GitHub Actions.
 */

import { Client as SSHClient, SFTPWrapper } from 'ssh2';
import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config';

// Types
export interface EC2Config {
  host: string;
  username: string;
  privateKey: string;
  deployDir: string;
  port?: number;
  serviceName?: string;
  servicePort?: number;
}

export interface DeploymentResult {
  success: boolean;
  message: string;
  deployedAt: string;
  host: string;
  servicePort: number;
}

export interface FileToUpload {
  localPath: string;
  remotePath: string;
}

// EC2 Deployer Class
export class EC2Deployer {
  private config: EC2Config;
  private sshClient: SSHClient | null = null;

  constructor(ec2Config?: Partial<EC2Config>) {
    this.config = {
      host: ec2Config?.host || config.aws.ec2Host,
      username: ec2Config?.username || config.aws.ec2Username,
      privateKey: ec2Config?.privateKey || config.aws.ec2PrivateKey,
      deployDir: ec2Config?.deployDir || config.aws.ec2DeployDir,
      port: ec2Config?.port || 22,
      serviceName: ec2Config?.serviceName || 'static-site',
      servicePort: ec2Config?.servicePort || 9500,
    };

    this.validateConfig();
  }

  private validateConfig(): void {
    const required = ['host', 'username', 'privateKey', 'deployDir'] as const;
    for (const field of required) {
      if (!this.config[field]) {
        throw new Error(
          `EC2 deployment requires ${field}. Check your environment variables.`
        );
      }
    }
  }

  /**
   * Establish SSH connection to EC2 instance
   */
  private async connect(): Promise<SSHClient> {
    return new Promise((resolve, reject) => {
      const client = new SSHClient();

      client.on('ready', () => {
        console.log('✓ SSH connection established');
        this.sshClient = client;
        resolve(client);
      });

      client.on('error', (err) => {
        console.error('✗ SSH connection error:', err);
        reject(err);
      });

      // Handle private key - either file path or content
      let privateKey: string;
      if (this.config.privateKey.includes('BEGIN')) {
        privateKey = this.config.privateKey;
      } else if (fs.existsSync(this.config.privateKey)) {
        privateKey = fs.readFileSync(this.config.privateKey, 'utf8');
      } else {
        throw new Error('Private key not found or invalid');
      }

      client.connect({
        host: this.config.host,
        port: this.config.port,
        username: this.config.username,
        privateKey,
      });
    });
  }

  /**
   * Execute a command on the remote EC2 instance
   */
  async executeCommand(command: string): Promise<string> {
    const client = this.sshClient || await this.connect();

    return new Promise((resolve, reject) => {
      client.exec(command, (err, stream) => {
        if (err) return reject(err);

        let output = '';
        let errorOutput = '';

        stream.on('data', (data: Buffer) => {
          output += data.toString();
          console.log(data.toString());
        });

        stream.stderr.on('data', (data: Buffer) => {
          errorOutput += data.toString();
          console.error(data.toString());
        });

        stream.on('close', (code: number) => {
          if (code !== 0 && errorOutput) {
            reject(new Error(`Command failed with code ${code}: ${errorOutput}`));
          } else {
            resolve(output);
          }
        });
      });
    });
  }

  /**
   * Upload files to EC2 via SFTP
   */
  async uploadFiles(files: FileToUpload[]): Promise<void> {
    const client = this.sshClient || await this.connect();

    return new Promise((resolve, reject) => {
      client.sftp((err, sftp: SFTPWrapper) => {
        if (err) return reject(err);

        const uploadPromises = files.map(
          (file) =>
            new Promise<void>((resolveFile, rejectFile) => {
              const readStream = fs.createReadStream(file.localPath);
              const writeStream = sftp.createWriteStream(file.remotePath);

              writeStream.on('close', () => {
                console.log(`✓ Uploaded: ${path.basename(file.localPath)}`);
                resolveFile();
              });

              writeStream.on('error', rejectFile);
              readStream.pipe(writeStream);
            })
        );

        Promise.all(uploadPromises)
          .then(() => resolve())
          .catch(reject);
      });
    });
  }

  /**
   * Upload a directory recursively
   */
  async uploadDirectory(localDir: string, remoteDir: string): Promise<void> {
    const client = this.sshClient || await this.connect();

    // Create remote directory
    await this.executeCommand(`mkdir -p ${remoteDir}`);

    return new Promise((resolve, reject) => {
      client.sftp(async (err, sftp: SFTPWrapper) => {
        if (err) return reject(err);

        const uploadDir = async (local: string, remote: string): Promise<void> => {
          const items = fs.readdirSync(local);

          for (const item of items) {
            const localPath = path.join(local, item);
            const remotePath = path.posix.join(remote, item);
            const stat = fs.statSync(localPath);

            if (stat.isDirectory()) {
              // Create remote directory and recurse
              await new Promise<void>((res, rej) => {
                sftp.mkdir(remotePath, (mkdirErr) => {
                  // Ignore "already exists" errors
                  if (mkdirErr && (mkdirErr as any).code !== 4) {
                    rej(mkdirErr);
                  } else {
                    res();
                  }
                });
              });
              await uploadDir(localPath, remotePath);
            } else {
              // Upload file
              await new Promise<void>((res, rej) => {
                const readStream = fs.createReadStream(localPath);
                const writeStream = sftp.createWriteStream(remotePath);
                writeStream.on('close', () => {
                  console.log(`✓ ${item}`);
                  res();
                });
                writeStream.on('error', rej);
                readStream.pipe(writeStream);
              });
            }
          }
        };

        try {
          console.log(`Uploading directory: ${localDir} → ${remoteDir}`);
          await uploadDir(localDir, remoteDir);
          resolve();
        } catch (uploadErr) {
          reject(uploadErr);
        }
      });
    });
  }

  /**
   * Deploy static site to EC2
   * Main deployment workflow matching the GitHub Actions pattern
   */
  async deploy(buildDir: string): Promise<DeploymentResult> {
    console.log('Starting deployment to EC2...');
    console.log(`Host: ${this.config.host}`);
    console.log(`Deploy Directory: ${this.config.deployDir}`);

    try {
      await this.connect();

      // Prepare remote directory
      console.log('\n1. Preparing remote directory...');
      await this.executeCommand(`mkdir -p ${this.config.deployDir}`);
      await this.executeCommand(`rm -rf ${this.config.deployDir}/*`);

      // Upload build files
      console.log('\n2. Uploading build files...');
      await this.uploadDirectory(buildDir, this.config.deployDir);

      // Start/Restart service with PM2
      console.log('\n3. Starting service...');
      const serviceName = this.config.serviceName;
      const servicePort = this.config.servicePort;

      const startCommand = `
        cd ${this.config.deployDir} && \
        npm install -g serve pm2 && \
        pm2 delete ${serviceName} || true && \
        pm2 start serve --name ${serviceName} -- -s . -l ${servicePort} && \
        pm2 save
      `;
      await this.executeCommand(startCommand);

      // Verify deployment
      console.log('\n4. Verifying deployment...');
      const verifyCommand = `curl -s -o /dev/null -w "%{http_code}" http://localhost:${servicePort}`;
      const statusCode = await this.executeCommand(verifyCommand);

      const success = statusCode.trim() === '200';
      
      if (success) {
        console.log('\n✓ Deployment successful!');
      } else {
        console.log(`\n⚠ Deployment completed but health check returned ${statusCode}`);
      }

      return {
        success,
        message: success ? 'Deployment successful' : `Health check returned ${statusCode}`,
        deployedAt: new Date().toISOString(),
        host: this.config.host,
        servicePort: servicePort!,
      };
    } finally {
      this.disconnect();
    }
  }

  /**
   * Check service status on EC2
   */
  async getServiceStatus(): Promise<{
    running: boolean;
    uptime?: string;
    memory?: string;
  }> {
    try {
      await this.connect();
      const output = await this.executeCommand(
        `pm2 jlist 2>/dev/null | grep -o '"name":"${this.config.serviceName}"[^}]*' || echo "not_found"`
      );

      if (output.includes('not_found')) {
        return { running: false };
      }

      const uptimeOutput = await this.executeCommand(
        `pm2 describe ${this.config.serviceName} | grep uptime || echo ""`
      );

      return {
        running: true,
        uptime: uptimeOutput.trim(),
      };
    } finally {
      this.disconnect();
    }
  }

  /**
   * Stop service on EC2
   */
  async stopService(): Promise<void> {
    try {
      await this.connect();
      await this.executeCommand(`pm2 delete ${this.config.serviceName} || true`);
      console.log(`✓ Service ${this.config.serviceName} stopped`);
    } finally {
      this.disconnect();
    }
  }

  /**
   * Restart service on EC2
   */
  async restartService(): Promise<void> {
    try {
      await this.connect();
      await this.executeCommand(`pm2 restart ${this.config.serviceName}`);
      console.log(`✓ Service ${this.config.serviceName} restarted`);
    } finally {
      this.disconnect();
    }
  }

  /**
   * Get service logs from EC2
   */
  async getLogs(lines = 50): Promise<string> {
    try {
      await this.connect();
      const output = await this.executeCommand(
        `pm2 logs ${this.config.serviceName} --lines ${lines} --nostream 2>&1`
      );
      return output;
    } finally {
      this.disconnect();
    }
  }

  /**
   * Close SSH connection
   */
  disconnect(): void {
    if (this.sshClient) {
      this.sshClient.end();
      this.sshClient = null;
      console.log('SSH connection closed');
    }
  }
}

// Export singleton factory
export function createEC2Deployer(config?: Partial<EC2Config>): EC2Deployer {
  return new EC2Deployer(config);
}

export default EC2Deployer;


