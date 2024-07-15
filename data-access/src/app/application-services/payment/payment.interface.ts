export interface PaymentApplicationService {
  generatePublicKey(): Promise<string>;
}