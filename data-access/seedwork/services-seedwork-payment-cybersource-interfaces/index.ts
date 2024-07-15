export interface CybersourceBase {
  generatePublicKey(): Promise<string>;
  createCustomerProfile(customerProfile: CustomerProfile, paymentToken: string): Promise<PaymentTransactionResponse>;
  getCustomerProfile(customerId: string): Promise<CustomerPaymentResponse>;
  addCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentToken: string): Promise<PaymentTransactionResponse>;
  getCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentInstrumentResponse>;
  getCustomerPaymentInstruments(customerId: string, offset?: number, limit?: number): Promise<CustomerPaymentInstrumentsResponse>;
  deleteCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>;
  setDefaultCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentResponse>;
  processPayment(clientReferenceCode: string, paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse>;
  refundPayment(paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse>;
  voidPayment(clientReferenceCode: string, amount: number): Promise<PaymentTransactionResponse>;
}

export interface CustomerProfile {
  customerId: string;
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingPhone: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
}

export interface PaymentTransactionResponse {
  _links: {
    self: {
      href: string;
      method: string;
    };
    capture: {
      href: string;
      method: string;
    };
  };
  id: string;
  submitTimeUtc: string; // '2024-07-08T20:56:04Z'
  status: string; // 'AUTHORIZED'
  reconciliationId: string;
  clientReferenceInformation: { code: string };
  processorInformation: {
    approvalCode: string;
    responseCode: string;
    avs: { code: string; codeRaw: string };
    cardVerification: { resultCode: string };
    paymentAccountReferenceNumber: string;
    transactionId: string;
    networkTransactionId: string;
  };
  paymentAccountInformation: { card: { type: string } }; // type: '001', '002', etc.
  paymentInformation: {
    card: { type: string };
    tokenizedCard: { type: string };
    paymentInstrument: { id: string };
    instrumentIdentifier: { id: string; state: string }; // state: 'ACTIVE'
    accountFeatures: { balanceAmount: string };
    customer: { id: string };
  };
  orderInformation: {
    amountDetails: { totalAmount: string; authorizedAmount: string; currency: string };
  };
  pointOfSaleInformation: { terminalId: string };
  tokenInformation: {
    instrumentidentifierNew: boolean;
    paymentInstrument: { id: string };
    instrumentIdentifier: { id: string; state: string }; // state: 'ACTIVE'
    customer: { id: string };
  };
}

export interface PaymentInstrument {
  _links: {
    self: {
      href: string;
    };
    customer: {
      href: string;
    };
  };
  id: string;
  default: boolean;
  state: string; // 'ACTIVE'
  card: {
    expirationMonth: string;
    expirationYear: string;
    type: string; // '001' = 'Visa', '002' = 'Master Card', '003' = 'American Express'
  };
  buyerInformation: {
    currency: string;
  };
  billTo: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    locality: string;
    administrativeArea: string;
    postalCode: string;
    country: string;
    email: string;
  };
  processingInformation: {
    billPaymentProgramEnabled: boolean;
  };
  instrumentIdentifier: {
    id: string;
  };
  metadata: {
    creator: string;
  };
  _embedded: {
    instrumentIdentifier: {
      _links: {
        self: {
          href: string;
        };
        paymentInstruments: {
          href: string;
        };
      };
      id: string;
      object: string; // 'instrumentIdentifier'
      state: string; // 'ACTIVE'
      card: {
        number: string;
      }; // '222242XXXXXX1113'
      processingInformation: {
        authorizationOptions: {
          initiator: {
            merchantInitiatedTransaction: {
              previousTransactionId: string;
            };
          };
        };
      };
      metadata: {
        creator: string;
      };
    };
  };
}

export interface CustomerPaymentResponse {
  _links: {
    self: {
      href: string;
    };
    paymentInstruments: {
      href: string;
    };
  };
  id: string; // Customer ID
  clientReferenceInformation: { code: string };
  defaultPaymentInstrument: { id: string };
  metadata: { creator: string };
  _embedded: {
    defaultPaymentInstrument: PaymentInstrument;
  };
}

export interface CustomerPaymentInstrumentResponse extends PaymentInstrument {}

export interface CustomerPaymentInstrumentsResponse {
  _links: {
    self: {
      href: string;
    };
    first: {
      href: string;
    };
    last: {
      href: string;
    };
  };
  offset: number;
  limit: number;
  count: number;
  total: number;
  _embedded: {
    paymentInstruments: PaymentInstrument[];
  };
}
