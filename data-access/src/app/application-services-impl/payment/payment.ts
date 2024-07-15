import { PaymentDataSource } from './payment-data-source';
import { PaymentApi } from '../../application-services';
import { AppContext } from '../../init/app-context-builder';

export class PaymentApiImpl extends PaymentDataSource<AppContext> implements PaymentApi {
  public async generatePublicKey(): Promise<string> {
    let key: string = '';
    await this.withCybersource(async (_passport, cybersource) => {
      key = await cybersource.generatePublicKey();
    });
    return key;
  }
}
