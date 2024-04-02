import { VercelDataSource } from './vercel-data-source';
import { DomainResponse } from '../../../app/domain/infrastructure/vercel/interfaces';
import { GraphqlContext } from '../../graphql-context';

export class Communities extends VercelDataSource<GraphqlContext> {

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
