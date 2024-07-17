import {
  PaymentTransactionResponse,
  CustomerProfile,
  CustomerPaymentInstrumentsResponse,
  CustomerPaymentResponse,
  CustomerPaymentInstrumentResponse,
  RefundPaymentResponse,
  PaymentTokenInfo,
  TransactionSearchResponse,
} from '../../../../seedwork/services-seedwork-payment-cybersource-interfaces';

export interface PaymentInfrastructureService {
  generatePublicKey(): Promise<string>;
  createCustomerProfile(customerProfile: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<PaymentTransactionResponse>;
  getCustomerProfile(customerId: string): Promise<CustomerPaymentResponse>;
  addCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<PaymentTransactionResponse>;
  getCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentInstrumentResponse>;
  getCustomerPaymentInstruments(customerId: string, offset?: number, limit?: number): Promise<CustomerPaymentInstrumentsResponse>;
  deleteCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>;
  setDefaultCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentResponse>;
  processPayment(clientReferenceCode: string, paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse>;
  refundPayment(transactionId: string, amount: number): Promise<RefundPaymentResponse>;
  voidPayment(clientReferenceCode: string, transactionId: string): Promise<PaymentTransactionResponse>;
  searchTransactions(clientReferenceCode: string): Promise<TransactionSearchResponse>;
}
