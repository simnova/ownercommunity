import { DomainResponse } from "../../external-dependencies/vercel";

export interface CommunityVercelApplicationService {
  getDomainDetails(domain:string): Promise<DomainResponse>
}
