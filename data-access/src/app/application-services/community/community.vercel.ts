import { VercelDataSource } from '../../data-sources/vercel-data-source';
import { AppContext } from '../../init/app-context-builder';
import { DomainResponse } from '../../../../seedwork/services-seedwork-vercel-api/interfaces';

export interface CommunityVercelApi {
  getDomainDetails(domain:string): Promise<DomainResponse>
}

export class CommunityVercelApiImpl
  extends VercelDataSource<AppContext> 
  implements CommunityVercelApi
{

  public async getDomainDetails(domain:string): Promise<DomainResponse> {
    let domainResponse: DomainResponse ;
    await this.withVercel(async (_passport, vercel) => {
      if(!domain || domain.trim().length === 0){
        domainResponse = { verified: false,  verification: [{type:'domainEmpty'}]} as DomainResponse;
      } else {
        try {
          domainResponse = await vercel.getProjectDomain(domain);
        }catch(error){
          domainResponse = { verified: false, verification: [{type:JSON.stringify(error)}] } as DomainResponse;
        }
      }
    });
    return domainResponse;
  }
  
}
