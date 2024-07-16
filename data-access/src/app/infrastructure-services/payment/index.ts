import {
  PaymentTransactionResponse,
  CustomerProfile,
  CustomerPaymentInstrumentsResponse,
  CustomerPaymentResponse,
  CustomerPaymentInstrumentResponse,
  RefundPaymentResponse
} from '../../../../seedwork/services-seedwork-payment-cybersource-interfaces';

export interface PaymentInfrastructureService {
  generatePublicKey(): Promise<string>;
  createCustomerProfile(customerProfile: CustomerProfile, paymentToken: string): Promise<PaymentTransactionResponse>;
  getCustomerProfile(customerId: string): Promise<CustomerPaymentResponse>;
  addCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentToken: string): Promise<PaymentTransactionResponse>;
  getCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentInstrumentResponse>;
  getCustomerPaymentInstruments(customerId: string, offset?: number, limit?: number): Promise<CustomerPaymentInstrumentsResponse>;
  deleteCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>;
  setDefaultCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentResponse>;
  processPayment(clientReferenceCode: string, paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse>;
  refundPayment(paymentInstrumentId: string, amount: number): Promise<RefundPaymentResponse>;
  voidPayment(clientReferenceCode: string, requestId: string, amount: number): Promise<PaymentTransactionResponse>;
}
