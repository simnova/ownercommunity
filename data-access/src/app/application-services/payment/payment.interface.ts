import { AddPaymentInstrumentInput, AddPaymentInstrumentMutationResult } from "../../external-dependencies/graphql-api";

export interface PaymentApplicationService {
  generatePublicKey(): Promise<string>;
  addPaymentInstrument(paymentInstrument: AddPaymentInstrumentInput, memberId: string): Promise<AddPaymentInstrumentMutationResult>;
}