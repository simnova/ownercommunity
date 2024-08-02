import { CybersourceBase } from "../../../../../seedwork/services-seedwork-payment-cybersource-interfaces";

export interface PaymentDomain extends CybersourceBase {}

export interface PaymentDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}