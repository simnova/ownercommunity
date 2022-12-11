import { VercelDataSource } from './vercel-data-source';
import { DomainResponse } from '../../../infrastructure/services/vercel';
import { Context } from '../../context';

export class Communities extends VercelDataSource<Context> {

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
