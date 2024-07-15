import { Cybersource } from "../../../../seedwork/services-seedwork-payment-cybersource";
import { PaymentInfrastructureService } from "../../../app/infrastructure-services/payment";

export class CybersourceImpl extends Cybersource implements PaymentInfrastructureService {

  /**
   * needs following environment variables:
   * ** CYBERSOURCE_APP_NAME
   * ** CYBERSOURCE_MERCHANT_ID
   * ** CYBERSOURCE_MERCHANT_KEY_ID
   * ** CYBERSOURCE_MERCHANT_KEY_SECRET
   * ** CYBERSOURCE_RUN_ENVIRONMENT
   * ** CYBERSOURCE_ENABLE_LOG
   * ** CYBERSOURCE_IFRAME_TARGET_ORIGIN
   */
  constructor() {
    super();
  }
}