export interface PaymentApplicationService {
  generateKey(): Promise<string>;
}