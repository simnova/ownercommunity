import { PaymentDataSource } from '../../data-sources/payment-data-source';
import { PaymentApi } from '../../application-services';
import { AppContext } from '../../init/app-context-builder';
import { AddPaymentInstrumentInput, PaymentInstrument } from '../../external-dependencies/graphql-api';
import { Cybersource } from '../../../../seedwork/services-seedwork-payment-cybersource';
import {
  CustomerPaymentInstrumentsResponse,
  CustomerPaymentResponse,
  CustomerProfile,
  PaymentTokenInfo,
} from '../../../../seedwork/services-seedwork-payment-cybersource-interfaces';

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

  public async getPaymentInstruments(customerId: string): Promise<PaymentInstrument[]> {
    let response;
    let cyberSourcePaymentInstrumentsResponse: CustomerPaymentInstrumentsResponse;
    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      cyberSourcePaymentInstrumentsResponse = await cybersource.getCustomerPaymentInstruments(customerId);
    });
    response = cyberSourcePaymentInstrumentsResponse?._embedded?.paymentInstruments.map((paymentInstrument) => {
      return {
        cardNumber: paymentInstrument?._embedded?.instrumentIdentifier?.card?.number,
        cardType: paymentInstrument?.card?.type,
        paymentInstrumentId: paymentInstrument?.id,
        isDefault: paymentInstrument?.default,
      };
    });
    return response;
  }

  public async setDefaultPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean> {
    let response: CustomerPaymentResponse;
    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      response = await cybersource.setDefaultCustomerPaymentInstrument(customerId, paymentInstrumentId);
    });
    return response._embedded.defaultPaymentInstrument.id === paymentInstrumentId;
  }

  public async deletePaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean> {
    let response: boolean;
    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      response = await cybersource.deleteCustomerPaymentInstrument(customerId, paymentInstrumentId);
    });
    return response;
  }
}
