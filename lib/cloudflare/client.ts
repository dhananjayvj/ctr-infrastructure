/**
 * Cloudflare API Client
 * 
 * Provides DNS management capabilities for the same Cloudflare zone
 * used by the main storezy platform. This allows creating subdomains
 * and custom domains without conflicting with existing records.
 * 
 * API Reference: https://developers.cloudflare.com/api/
 */

import { config } from '../config';

// Types
export interface CloudflareDNSRecord {
  id?: string;
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX' | 'NS';
  name: string;
  content: string;
  ttl?: number;
  proxied?: boolean;
  priority?: number;
  comment?: string;
}

export interface CloudflareResponse<T> {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
  result: T;
  result_info?: {
    page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
  };
}

export interface DNSRecordResult extends CloudflareDNSRecord {
  id: string;
  zone_id: string;
  zone_name: string;
  created_on: string;
  modified_on: string;
  proxiable: boolean;
  locked: boolean;
}

// Cloudflare API Client Class
export class CloudflareClient {
  private apiToken: string;
  private zoneId: string;
  private baseUrl = 'https://api.cloudflare.com/client/v4';

  constructor(apiToken?: string, zoneId?: string) {
    this.apiToken = apiToken || config.cloudflare.apiToken;
    this.zoneId = zoneId || config.cloudflare.zoneId;

    if (!this.apiToken) {
      throw new Error(
        'Cloudflare API token is required. Set CLOUDFLARE_API_TOKEN environment variable.'
      );
    }
    if (!this.zoneId) {
      throw new Error(
        'Cloudflare Zone ID is required. Set CLOUDFLARE_ZONE_ID environment variable.'
      );
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<CloudflareResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!data.success) {
      const errorMessages = data.errors
        ?.map((e: { message: string }) => e.message)
        .join(', ');
      throw new Error(`Cloudflare API Error: ${errorMessages}`);
    }

    return data as CloudflareResponse<T>;
  }

  /**
   * List all DNS records in the zone
   * Optionally filter by type, name, or content
   */
  async listDNSRecords(filters?: {
    type?: string;
    name?: string;
    content?: string;
  }): Promise<DNSRecordResult[]> {
    let endpoint = `/zones/${this.zoneId}/dns_records`;
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.name) params.append('name', filters.name);
      if (filters.content) params.append('content', filters.content);
      if (params.toString()) endpoint += `?${params.toString()}`;
    }

    const response = await this.request<DNSRecordResult[]>(endpoint);
    return response.result;
  }

  /**
   * Create a new DNS record
   * Use this to provision subdomains for deployed static sites
   */
  async createDNSRecord(record: CloudflareDNSRecord): Promise<DNSRecordResult> {
    const endpoint = `/zones/${this.zoneId}/dns_records`;
    const response = await this.request<DNSRecordResult>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        type: record.type,
        name: record.name,
        content: record.content,
        ttl: record.ttl || 1, // 1 = automatic
        proxied: record.proxied ?? true,
        priority: record.priority,
        comment: record.comment || 'Created by Static Website Builder',
      }),
    });
    return response.result;
  }

  /**
   * Update an existing DNS record
   */
  async updateDNSRecord(
    recordId: string,
    record: Partial<CloudflareDNSRecord>
  ): Promise<DNSRecordResult> {
    const endpoint = `/zones/${this.zoneId}/dns_records/${recordId}`;
    const response = await this.request<DNSRecordResult>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(record),
    });
    return response.result;
  }

  /**
   * Delete a DNS record
   */
  async deleteDNSRecord(recordId: string): Promise<{ id: string }> {
    const endpoint = `/zones/${this.zoneId}/dns_records/${recordId}`;
    const response = await this.request<{ id: string }>(endpoint, {
      method: 'DELETE',
    });
    return response.result;
  }

  /**
   * Get a specific DNS record by ID
   */
  async getDNSRecord(recordId: string): Promise<DNSRecordResult> {
    const endpoint = `/zones/${this.zoneId}/dns_records/${recordId}`;
    const response = await this.request<DNSRecordResult>(endpoint);
    return response.result;
  }

  /**
   * Find DNS record by name
   * Useful for checking if a subdomain already exists
   */
  async findDNSRecordByName(
    name: string,
    type?: string
  ): Promise<DNSRecordResult | null> {
    const records = await this.listDNSRecords({ name, type });
    return records.length > 0 ? records[0] : null;
  }

  /**
   * Create or update a subdomain record
   * Safely provisions a subdomain without affecting existing records
   */
  async upsertSubdomain(
    subdomain: string,
    targetIP: string,
    options?: {
      type?: 'A' | 'CNAME';
      proxied?: boolean;
      comment?: string;
    }
  ): Promise<DNSRecordResult> {
    const type = options?.type || 'A';
    const fullName = subdomain.includes('.') ? subdomain : `${subdomain}`;
    
    // Check if record already exists
    const existing = await this.findDNSRecordByName(fullName, type);

    if (existing) {
      console.log(`Updating existing DNS record for ${fullName}`);
      return this.updateDNSRecord(existing.id, {
        content: targetIP,
        proxied: options?.proxied ?? true,
        comment: options?.comment,
      });
    }

    console.log(`Creating new DNS record for ${fullName}`);
    return this.createDNSRecord({
      type,
      name: fullName,
      content: targetIP,
      proxied: options?.proxied ?? true,
      comment: options?.comment || 'Created by Static Website Builder',
    });
  }

  /**
   * Verify zone access
   * Use this to test API credentials
   */
  async verifyAccess(): Promise<boolean> {
    try {
      const endpoint = `/zones/${this.zoneId}`;
      const response = await this.request<{ id: string; name: string }>(endpoint);
      console.log(`✓ Verified access to zone: ${response.result.name}`);
      return true;
    } catch (error) {
      console.error('✗ Failed to verify Cloudflare access:', error);
      return false;
    }
  }

  /**
   * Purge cache for specific URLs or entire zone
   */
  async purgeCache(options?: {
    urls?: string[];
    purgeEverything?: boolean;
  }): Promise<{ id: string }> {
    const endpoint = `/zones/${this.zoneId}/purge_cache`;
    const body = options?.purgeEverything
      ? { purge_everything: true }
      : { files: options?.urls || [] };

    const response = await this.request<{ id: string }>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return response.result;
  }
}

// Export singleton instance for convenience
let clientInstance: CloudflareClient | null = null;

export function getCloudflareClient(): CloudflareClient {
  if (!clientInstance) {
    clientInstance = new CloudflareClient();
  }
  return clientInstance;
}

export default CloudflareClient;


