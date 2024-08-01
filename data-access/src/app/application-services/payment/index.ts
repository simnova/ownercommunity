import { AppContext } from "../../init/app-context-builder";
import { PaymentCybersourceApi, PaymentCybersourceApiImpl } from "./payment.cybersource";

export interface PaymentApi {
  cybersourceApi: PaymentCybersourceApi;
}

export class PaymentApiImpl implements PaymentApi {
  cybersourceApi: PaymentCybersourceApi;

  constructor(context: AppContext) {
    this.cybersourceApi = new PaymentCybersourceApiImpl({ context });
  }

}