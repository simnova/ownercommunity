import axios from 'axios';

export interface DomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307| 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt: number;
  createdAt?: number
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string
    domain: string
    value: string
    reason: string
  }[]
}




export class Vercel {
  private readonly _vercelTokenEnvVar: string =  'VERCEL_TOKEN';
  private readonly _vercelToken: string;

  private readonly _vercelProjectEnvVar: string = 'VERCEL_PROJECT';
  private readonly _vercelProject: string;

  private tryGetEnvVar(envVar: string): string {
    const value = process.env[envVar];
    if (value === undefined) {
        throw new Error(`Environment variable ${envVar} is not set`);
    }
    return value;
  }

  constructor(){
    try {
      this._vercelToken = this.tryGetEnvVar(this._vercelTokenEnvVar);
      this._vercelProject = this.tryGetEnvVar(this._vercelProjectEnvVar);
    } catch (error) {
      console.error('Error in Vercel constructor: ', error);
    }
  }

  async addDomainToProject(domain:string): Promise<DomainResponse> {
    const results = await axios({
      method: 'POST',
      url: `https://api.vercel.com/v9/projects/${this._vercelProject}/domains`, 
      headers: {
        Authorization: `Bearer ${this._vercelToken}`
      },
      data: {
        "name" : '"${domain}"' 
      }
    });
    return results.data as DomainResponse;
  }

  async removeDomainFromProject(domain:string): Promise<Boolean> {
    const results = await axios.delete(
      `https://api.vercel.com/v9/projects/${this._vercelProject}/domains/${domain}`,
     {
        headers: {
          Authorization: `Bearer ${this._vercelToken}`
        }
      }
    );
    return results.status === 200;
  }

  async getProjectDomain(domain:string): Promise<DomainResponse> {
    const results = await axios.get(
      `https://api.vercel.com/v9/projects/${this._vercelProject}/domains/${domain}`,
     {
        headers: {
          Authorization: `Bearer ${this._vercelToken}`
        }
      }
    );
    console.log('getProjectDomain results: ', results);
    return results.data as DomainResponse;
  }
  async getDomainConfig(domain:string): Promise<any> {
    const results = await axios.get(
      `https://api.vercel.com/v9/projects/${this._vercelProject}/domains/${domain}/config`,
     {
        headers: {
          Authorization: `Bearer ${this._vercelToken}`
        }
      }
    );
    console.log('getDomainConfig results: ', results);
    return results.data;
  }
}