import { Cybersource } from "../../../../seedwork/services-seedwork-payment-cybersource";
import { PaymentInfrastructureService } from "../../../app/infrastructure-services/payment";

export class CybersourceImpl extends Cybersource implements PaymentInfrastructureService {
  constructor() {
    super();
  }
}