export interface PaymentInfrastructureService {
  generateKey(): Promise<string>;
}