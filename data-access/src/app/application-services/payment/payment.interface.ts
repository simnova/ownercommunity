import { CustomerProfile, PaymentTokenInfo } from "../../../../seedwork/services-seedwork-payment-cybersource-interfaces";
import { ProcessPaymentParams } from "../../application-services-impl/payment/payment";
import { TransactionProps } from "../../domain/contexts/violation-ticket/transaction";
import { AddPaymentInstrumentInput, PaymentInstrument } from "../../external-dependencies/graphql-api";

export interface PaymentApplicationService {
  generatePublicKey(): Promise<string>;
  createCybersouceCustomer(paymentInstrument: AddPaymentInstrumentInput): Promise<string>
  addPaymentInstrument(paymentInstrument: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<boolean>
  getPaymentInstruments(customerId: string): Promise<PaymentInstrument[]>
  setDefaultPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>
  deletePaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>
  processPayment(processPaymentParams: ProcessPaymentParams): Promise<TransactionProps>
}