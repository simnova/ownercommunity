import { DomainResponse } from "../../../../seedwork/services-seedwork-vercel-api/interfaces";

export interface CommunityVercelApplicationService {
  getDomainDetails(domain:string): Promise<DomainResponse>
}
