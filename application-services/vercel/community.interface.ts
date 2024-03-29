export interface CommunityVercelApplicationService {
  getDomainDetails(domain:string): Promise<DomainResponse>
}

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