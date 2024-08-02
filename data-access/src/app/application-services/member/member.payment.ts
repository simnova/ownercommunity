import { Cybersource } from "../../../../seedwork/services-seedwork-payment-cybersource";
import { CustomerPaymentInstrumentsResponse, CustomerPaymentResponse, CustomerProfile, PaymentTokenInfo, PaymentInstrumentInfo, PaymentTransactionResponse, PaymentInstrument as PaymentInstrumentInterface } from "../../../../seedwork/services-seedwork-payment-cybersource-interfaces";
import { PaymentDataSource } from "../../data-sources/payment-data-source";
import { AddPaymentInstrumentInput, PaymentBillingInfo, PaymentInstrument } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../init/app-context-builder";

export interface PaymentCybersourceApi {
  generatePublicKey(): Promise<string>;
  createCybersourceCustomer(paymentInstrument: AddPaymentInstrumentInput): Promise<string>;
  addPaymentInstrument(paymentInstrument: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<boolean>;
  getPaymentInstruments(customerId: string): Promise<PaymentInstrument[]>;
  setDefaultPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>;
  deletePaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>;
  processPayment(processPaymentParams: ProcessPaymentParams): Promise<CybersourcePaymentTransactionResponse>;
}

export interface ProcessPaymentParams {
  clientReferenceCode: string;
  paymentInstrumentId: string;
  amount: number;
}

export interface CybersourcePaymentTransactionResponse {
  authorizedAmount: number;
  vendor: string;
  referenceId: string;
  completedOn: Date;
}

export class PaymentCybersourceApiImpl extends PaymentDataSource<AppContext> implements PaymentCybersourceApi {
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

  private mapCybersourceToPaymentBillingInfo(paymentInstrument: PaymentInstrumentInterface): PaymentBillingInfo {
    return {
        billingAddressLine1: paymentInstrument?.billTo?.address1,
        billingAddressLine2: paymentInstrument?.billTo?.address2,
        billingCity: paymentInstrument?.billTo?.locality,
        billingCountry: paymentInstrument?.billTo?.country,
        billingEmail: paymentInstrument?.billTo?.email,
        billingFirstName: paymentInstrument?.billTo?.firstName,
        billingLastName: paymentInstrument?.billTo?.lastName,
        billingPhone: paymentInstrument?.billTo?.phoneNumber,
        billingPostalCode: paymentInstrument?.billTo?.postalCode,
        billingState: paymentInstrument?.billTo?.administrativeArea
    }
  }

  public async createCybersourceCustomer(paymentInstrument: AddPaymentInstrumentInput): Promise<string> {
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

  public async updatePaymentInstrument(customerProfile: CustomerProfile, paymentInstrumentInfo: PaymentInstrumentInfo): Promise<boolean> {
    let response;
    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      response = await cybersource.updateCustomerPaymentInstrument(customerProfile, paymentInstrumentInfo);
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
      const billDetails: PaymentBillingInfo = this.mapCybersourceToPaymentBillingInfo(paymentInstrument);  
      return {
        cardNumber: paymentInstrument?._embedded?.instrumentIdentifier?.card?.number,
        cardType: paymentInstrument?.card?.type,
        paymentInstrumentId: paymentInstrument?.id,
        isDefault: paymentInstrument?.default,
        expirationMonth: paymentInstrument?.card?.expirationMonth,
        expirationYear: paymentInstrument?.card?.expirationYear,
        id: paymentInstrument?.instrumentIdentifier?.id,
        state: paymentInstrument?.state,
        billTo: billDetails
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

  public async processPayment(processPaymentParams: ProcessPaymentParams): Promise<CybersourcePaymentTransactionResponse> {
    let response: PaymentTransactionResponse = null;

    await this.withCybersource(async (_passport, cybersource: Cybersource) => {
      response = await cybersource.processPayment(processPaymentParams.clientReferenceCode, processPaymentParams.paymentInstrumentId, processPaymentParams.amount);
    });

    return {
      authorizedAmount: parseFloat(response?.orderInformation?.amountDetails?.authorizedAmount),
      vendor: 'Cybersource',
      referenceId: response?.clientReferenceInformation?.code,
      completedOn: new Date(),
    };
  }
}
