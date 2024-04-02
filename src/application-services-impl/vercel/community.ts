import { DomainResponse } from '../../app/application-services/vercel/community.interface';
import { AppContext } from '../../app/app-context';
import { VercelApplicationServiceImpl } from './_vercel.application-service';

export class CommunityVercelApplicationServiceImpl extends VercelApplicationServiceImpl<AppContext> {

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
