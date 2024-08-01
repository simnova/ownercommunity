import { Cybersource } from "../../../../seedwork/services-seedwork-payment-cybersource";
import { CustomerPaymentInstrumentsResponse, CustomerPaymentResponse, CustomerProfile, PaymentTokenInfo, PaymentTransactionResponse } from "../../../../seedwork/services-seedwork-payment-cybersource-interfaces";
import { PaymentDataSource } from "../../data-sources/payment-data-source";
import { TransactionProps } from "../../domain/contexts/cases/violation-ticket/v1/transaction";
import { AddPaymentInstrumentInput, PaymentInstrument } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../init/app-context-builder";

export interface PaymentCybersourceApi {
  generatePublicKey(): Promise<string>;
  createCybersourceCustomer(paymentInstrument: AddPaymentInstrumentInput): Promise<string>
  addPaymentInstrument(paymentInstrument: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<boolean>
  getPaymentInstruments(customerId: string): Promise<PaymentInstrument[]>
  setDefaultPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>
  deletePaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>
  processPayment(processPaymentParams: ProcessPaymentParams): Promise<TransactionProps>
}

export interface ProcessPaymentParams {
  id: string;
  clientReferenceCode: string;
  paymentInstrumentId: string;
  amount: number;
  type: string;
  description: string;
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
        expirationMonth: paymentInstrument?.card?.expirationMonth,
        expirationYear: paymentInstrument?.card?.expirationYear,
        id: paymentInstrument?.instrumentIdentifier?.id,
        state: paymentInstrument?.state,
        billTo: paymentInstrument?.billTo
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

  public async processPayment(processPaymentParams: ProcessPaymentParams): Promise<TransactionProps> {
    let response: PaymentTransactionResponse = null;
    let paymentTransaction: TransactionProps = null;
    let paymentTransactionError: any = null;
    try {
      await this.withCybersource(async (_passport, cybersource: Cybersource) => {
        response = await cybersource.processPayment(processPaymentParams.clientReferenceCode, processPaymentParams.paymentInstrumentId, processPaymentParams.amount);
      });
    } catch (error) {
      paymentTransactionError = error;
    }

    paymentTransaction = {
      id: processPaymentParams.id,
      type: processPaymentParams.type,
      description: processPaymentParams.description,
      transactionId: response?.id,
      status: response?.status,
      clientReferenceCode: response?.clientReferenceInformation?.code,
      amountDetails: {
        amount: parseFloat(response?.orderInformation?.amountDetails?.totalAmount),
        authorizedAmount: parseFloat(response?.orderInformation?.amountDetails?.authorizedAmount),
        currency: response?.orderInformation?.amountDetails?.currency,
      },
      reconciliationId: response?.reconciliationId,
      isSuccess: response?.status === 'AUTHORIZED',
      transactionTime: paymentTransactionError ? null : new Date(response?.submitTimeUtc),
      successTimestamp: new Date(),
      error: paymentTransactionError ? {
        code: paymentTransactionError?.code,
        message: paymentTransactionError?.message,
        timestamp: new Date(),
      } : null,
    };

    return paymentTransaction;
  }
}