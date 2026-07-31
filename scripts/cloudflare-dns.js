#!/usr/bin/env node
/**
 * Cloudflare DNS Management CLI
 * 
 * Usage:
 *   npm run dns:list                     - List all DNS records
 *   npm run dns:create                   - Interactive record creation
 *   npm run dns:delete                   - Interactive record deletion
 * 
 * Or directly:
 *   node scripts/cloudflare-dns.js list
 *   node scripts/cloudflare-dns.js create --subdomain blog --ip 1.2.3.4
 *   node scripts/cloudflare-dns.js delete --name blog.example.com
 */

require('dotenv').config();

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;

if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ZONE_ID) {
  console.error('Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID are required');
  console.error('Please set them in your .env file');
  process.exit(1);
}

const BASE_URL = 'https://api.cloudflare.com/client/v4';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  const data = await response.json();
  
  if (!data.success) {
    const errors = data.errors?.map(e => e.message).join(', ') || 'Unknown error';
    throw new Error(`Cloudflare API Error: ${errors}`);
  }
  
  return data;
}

async function listRecords(type) {
  let endpoint = `/zones/${CLOUDFLARE_ZONE_ID}/dns_records`;
  if (type) endpoint += `?type=${type}`;
  
  const data = await request(endpoint);
  return data.result;
}

async function createRecord(record) {
  const endpoint = `/zones/${CLOUDFLARE_ZONE_ID}/dns_records`;
  const data = await request(endpoint, {
    method: 'POST',
    body: JSON.stringify(record),
  });
  return data.result;
}

async function deleteRecord(recordId) {
  const endpoint = `/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`;
  const data = await request(endpoint, { method: 'DELETE' });
  return data.result;
}

async function findRecordByName(name) {
  const records = await listRecords();
  return records.find(r => r.name === name || r.name.startsWith(name + '.'));
}

// CLI Commands
const commands = {
  async list() {
    console.log('Fetching DNS records...\n');
    const records = await listRecords();
    
    if (records.length === 0) {
      console.log('No DNS records found.');
      return;
    }
    
    console.log('DNS Records:');
    console.log('─'.repeat(80));
    console.log(
      'Type'.padEnd(8) +
      'Name'.padEnd(35) +
      'Content'.padEnd(20) +
      'Proxied'.padEnd(10)
    );
    console.log('─'.repeat(80));
    
    records.forEach(record => {
      console.log(
        record.type.padEnd(8) +
        record.name.substring(0, 33).padEnd(35) +
        record.content.substring(0, 18).padEnd(20) +
        (record.proxied ? '✓' : '✗').padEnd(10)
      );
    });
    
    console.log('─'.repeat(80));
    console.log(`Total: ${records.length} records`);
  },
  
  async create(args) {
    const subdomain = args['--subdomain'] || args['-s'];
    const ip = args['--ip'] || args['-i'];
    const type = args['--type'] || 'A';
    const proxied = args['--no-proxy'] ? false : true;
    
    if (!subdomain || !ip) {
      console.log('Usage: node scripts/cloudflare-dns.js create --subdomain <name> --ip <address>');
      console.log('\nOptions:');
      console.log('  --subdomain, -s  Subdomain name (required)');
      console.log('  --ip, -i         IP address or CNAME target (required)');
      console.log('  --type           Record type (default: A)');
      console.log('  --no-proxy       Disable Cloudflare proxy');
      process.exit(1);
    }
    
    console.log(`Creating DNS record: ${subdomain} → ${ip}`);
    
    const record = await createRecord({
      type,
      name: subdomain,
      content: ip,
      proxied,
      ttl: 1, // Auto
      comment: 'Created by Static Website Builder CLI',
    });
    
    console.log('\n✓ DNS record created successfully!');
    console.log(`  Name:    ${record.name}`);
    console.log(`  Type:    ${record.type}`);
    console.log(`  Content: ${record.content}`);
    console.log(`  Proxied: ${record.proxied ? 'Yes' : 'No'}`);
    console.log(`  ID:      ${record.id}`);
  },
  
  async delete(args) {
    const name = args['--name'] || args['-n'];
    const id = args['--id'];
    
    if (!name && !id) {
      console.log('Usage: node scripts/cloudflare-dns.js delete --name <record-name>');
      console.log('   or: node scripts/cloudflare-dns.js delete --id <record-id>');
      process.exit(1);
    }
    
    let recordId = id;
    
    if (name && !recordId) {
      console.log(`Looking for record: ${name}`);
      const record = await findRecordByName(name);
      
      if (!record) {
        console.error(`Error: Record not found: ${name}`);
        process.exit(1);
      }
      
      recordId = record.id;
      console.log(`Found record: ${record.name} (${record.type}) → ${record.content}`);
    }
    
    console.log(`Deleting record: ${recordId}`);
    await deleteRecord(recordId);
    
    console.log('\n✓ DNS record deleted successfully!');
  },
  
  async verify() {
    console.log('Verifying Cloudflare API access...\n');
    
    try {
      const endpoint = `/zones/${CLOUDFLARE_ZONE_ID}`;
      const data = await request(endpoint);
      
      console.log('✓ API access verified!');
      console.log(`  Zone: ${data.result.name}`);
      console.log(`  ID:   ${data.result.id}`);
      console.log(`  Status: ${data.result.status}`);
    } catch (error) {
      console.error('✗ Verification failed:', error.message);
      process.exit(1);
    }
  },
};

// Parse arguments
function parseArgs(args) {
  const result = { _: [] };
  let current = null;
  
  for (const arg of args) {
    if (arg.startsWith('-')) {
      current = arg;
      result[current] = true;
    } else if (current) {
      result[current] = arg;
      current = null;
    } else {
      result._.push(arg);
    }
  }
  
  return result;
}

// Main
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || 'list';
  
  if (!commands[command]) {
    console.log('Available commands: list, create, delete, verify');
    process.exit(1);
  }
  
  try {
    await commands[command](args);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();


