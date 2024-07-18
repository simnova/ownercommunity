import { PaymentDataSource } from './payment-data-source';
import { PaymentApi } from '../../application-services';
import { AppContext } from '../../init/app-context-builder';
import { AddPaymentInstrumentInput } from '../../external-dependencies/graphql-api';
import { Cybersource } from '../../../../seedwork/services-seedwork-payment-cybersource';
import { CustomerProfile, PaymentTokenInfo } from '../../../../seedwork/services-seedwork-payment-cybersource-interfaces';

export class PaymentApiImpl extends PaymentDataSource<AppContext> implements PaymentApi {
  public async generatePublicKey(): Promise<string> {
    let key: string = '';
    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      key = await cybersource.generatePublicKey();
    });
    return key;
  }

  private buildCustomerProfilePayload(billingDetail: AddPaymentInstrumentInput, customerId: string = null): CustomerProfile {
    if (customerId) {
      return { ...billingDetail, customerId } as CustomerProfile;
    }
    return billingDetail as CustomerProfile;
  }

  private buildPaymentTokenInfo(paymentInstrument: AddPaymentInstrumentInput): PaymentTokenInfo {
    return {
      paymentToken: paymentInstrument.paymentToken,
      isDefault: paymentInstrument.isDefault,
    };
  }

  public async createCybersouceCustomer(paymentInstrument: AddPaymentInstrumentInput): Promise<string> {
    const customerProfilePayload = this.buildCustomerProfilePayload(paymentInstrument);
    const paymentTokenInfo = this.buildPaymentTokenInfo(paymentInstrument);
    let response;
    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      response = await cybersource.createCustomerProfile(customerProfilePayload, paymentTokenInfo);
    });
    return response.tokenInformation.customer.id;
  }

  public async addPaymentInstrument(customerProfile: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<boolean> {
    let response;
    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      response = await cybersource.addCustomerPaymentInstrument(customerProfile, paymentTokenInfo);
    });
    return response.status === 'AUTHORIZED';
  }
}
