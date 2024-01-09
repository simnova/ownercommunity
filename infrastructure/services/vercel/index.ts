import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface VercelResponseHeaders {
  /** The maximum number of requests that the consumer is permitted to make.
   * header: X-RateLimit-Limit  **/
  RateLimitLimit: number;
  /** The number of requests remaining in the current rate limit window.
   * header: X-RateLimit-Remaining  **/
  RateLimitRemaining: number;
  /** The number of seconds left in the current rate limit window.
   * header: X-RateLimit-Reset  **/
  RateLimitReset: number;
}

export interface DomainResponse extends VercelResponseHeaders {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export interface AddDomainResult {
  success?: boolean;
  error?: {
    code: 'InvalidKey' | 'AlreadyAdded' | 'RateLimited' | 'InvalidDomain' | 'Other';
    message: string;
  };
}

export interface IVercel {
  addDomainToProject(domain: string): Promise<{ result?: DomainResponse } & APIResponse>;
  removeDomainFromProject(domain: string): Promise<boolean>;
  getProjectDomain(domain: string): Promise<DomainResponse>;
}

export interface APIError {
  code: string;
  message: string;
}

export interface APIResponse {
  success: boolean;
  error?: APIError;
}

export class Vercel implements IVercel {
  private readonly _vercelToken: string;
  private readonly _vercelProject: string;

  constructor(vercelToken: string, vercelProject: string) {
    this._vercelToken = vercelToken;
    this._vercelProject = vercelProject;
  }

  private extractResponseHeaders(response: AxiosResponse<any>): VercelResponseHeaders {
    const headers = response.headers;
    return {
      RateLimitLimit: parseInt(headers['x-RateLimit-Limit']),
      RateLimitRemaining: parseInt(headers['x-RateLimit-Remaining']),
      RateLimitReset: parseInt(headers['x-RateLimit-Reset']),
    };
  }

  private addAuthorizationHeader(config: AxiosRequestConfig = {}): AxiosRequestConfig {
    config.headers = { ...config.headers, Authorization: `Bearer ${this._vercelToken}` };
    return config;
  }

  async addDomain(domain: string): Promise<AddDomainResult> {
    const result = await this.addDomainToProject(domain);
    const errorCodes = new Map<string, 'InvalidKey' | 'AlreadyAdded' | 'RateLimited' | 'InvalidDomain' | 'Other'>([
      ['400', 'InvalidDomain'],
      ['403', 'InvalidKey'],
      ['409', 'AlreadyAdded'],
      ['429', 'RateLimited'],
    ]);
    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: { code: errorCodes.get(result.error?.code) ?? 'Other', message: result.error?.message } };
      // return {success: false, error: {code: result.error?.code as "AlreadyAdded" | "RateLimited" | "InvalidDomain" | "Other", message: result.error?.message}};
    }
  }

  async addDomainToProject(domain: string): Promise<{ result?: DomainResponse } & APIResponse> {
    //confirm domain is a valid domain
    if (!RegExp(/^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]?\.(xn--)?([a-z0-9-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/).exec(domain)) {
      return { success: false, error: { code: '400', message: `The specified value '${domain}' is not a fully qualified domain name` } };
    }

    const data = {
      name: domain,
    };
    let results: AxiosResponse<any>;
    try {
      results = await axios.post(`https://api.vercel.com/v9/projects/${this._vercelProject}/domains`, JSON.stringify(data), this.addAuthorizationHeader());
    } catch (err: any) {
      if (typeof err === 'object' && err.isAxiosError === true) {
        // Access to config, request, and response
        switch (err.response?.status) {
          case 403:
            return { success: false, error: { code: '403', message: 'Forbidden - check Vercel token and project ID' } };
          case 409:
            return { success: false, error: { code: '409', message: 'Domain already exists' } };
          case 429:
            return { success: false, error: { code: '429', message: 'Too many requests - check Vercel rate limits' } };
          default:
            throw err;
        }
      } else {
        //console.error('Standard Unknown error: ', err);
        // Just a stock error
        throw err;
      }
    }
    console.log('results: ', results);
    const responseHeaders: VercelResponseHeaders = this.extractResponseHeaders(results);
    return { success: true, result: { ...responseHeaders, ...results.data } };
  }

  async removeDomainFromProject(domain: string): Promise<boolean> {
    const results = await axios.delete(`https://api.vercel.com/v9/projects/${this._vercelProject}/domains/${domain}`, {
      headers: {
        Authorization: `Bearer ${this._vercelToken}`,
      },
    });
    return results.status === 200;
  }

  async getProjectDomain(domain: string): Promise<DomainResponse> {
    const results = await axios.get(`https://api.vercel.com/v9/projects/${this._vercelProject}/domains/${domain}`, {
      headers: {
        Authorization: `Bearer ${this._vercelToken}`,
      },
    });
    console.log('getProjectDomain results: ', results);
    return results.data as DomainResponse;
  }
  async getDomainConfig(domain: string): Promise<any> {
    const results = await axios.get(`https://api.vercel.com/v9/projects/${this._vercelProject}/domains/${domain}/config`, {
      headers: {
        Authorization: `Bearer ${this._vercelToken}`,
      },
    });
    console.log('getDomainConfig results: ', results);
    return results.data;
  }
}
