import { PaymentDataSource } from './payment-data-source';
import { PaymentApi } from '../../application-services';
import { AppContext } from '../../init/app-context-builder';
import { AddPaymentInstrumentInput, PaymentInstrument } from '../../external-dependencies/graphql-api';
import { Cybersource } from '../../../../seedwork/services-seedwork-payment-cybersource';
import {
  CustomerPaymentInstrumentsResponse,
  CustomerPaymentResponse,
  CustomerProfile,
  PaymentTokenInfo,
  PaymentTransactionResponse
} from '../../../../seedwork/services-seedwork-payment-cybersource-interfaces';
import { TransactionProps } from '../../domain/contexts/violation-ticket/transaction';

export interface ProcessPaymentParams {
  id: string;
  clientReferenceCode: string;
  paymentInstrumentId: string;
  amount: number;
  type: string;
  description: string;
}
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

  public async processPayment(processPaymentParams: ProcessPaymentParams): Promise<TransactionProps> {
    let response: PaymentTransactionResponse = null;
    let paymentTransaction : TransactionProps = null;
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
      transactionTime: !paymentTransactionError ? new Date(response?.submitTimeUtc) : null,
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
