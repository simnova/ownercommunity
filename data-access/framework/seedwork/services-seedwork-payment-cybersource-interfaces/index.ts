export interface CybersourceBase {
  generatePublicKey(): Promise<string>;
  createCustomerProfile(customerProfile: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<PaymentTransactionResponse>;
  getCustomerProfile(customerId: string): Promise<CustomerPaymentResponse>;
  addCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentTokenInfo: PaymentTokenInfo): Promise<PaymentTransactionResponse>;
  getCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentInstrumentResponse>;
  getCustomerPaymentInstruments(customerId: string, offset?: number, limit?: number): Promise<CustomerPaymentInstrumentsResponse>;
  deleteCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<boolean>;
  setDefaultCustomerPaymentInstrument(customerId: string, paymentInstrumentId: string): Promise<CustomerPaymentResponse>;
  updateCustomerPaymentInstrument(customerProfile: CustomerProfile, paymentInstrumentInfo: PaymentInstrumentInfo): Promise<CustomerPaymentInstrumentResponse>;
  processPayment(clientReferenceCode: string, paymentInstrumentId: string, amount: number): Promise<PaymentTransactionResponse>;
  refundPayment(transactionId: string, amount: number): Promise<RefundPaymentResponse>;
  voidPayment(clientReferenceCode: string, transactionId: string): Promise<PaymentTransactionResponse>;
  searchTransactions(clientReferenceCode: string): Promise<TransactionSearchResponse>;
}

export interface CybersourceInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}

export interface CybersourceInfrastructureService extends CybersourceBase, CybersourceInitializeable {}

export interface CustomerProfile {
  customerId?: string;
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingPhone: string;
  billingAddressLine1: string;
  billingAddressLine2?: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
}

export interface PaymentTokenInfo {
  paymentToken: string;
  isDefault: boolean;
}

export interface PaymentInstrumentInfo {
  id: string;
  paymentInstrumentId: string;
  cardType: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
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
  voidAmountDetails: { voidAmount: string; currency: string };
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
  object: string; // 'paymentInstrument'
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
    phoneNumber: string;
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
        creator: string; // 'ecfmg_faimer'
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

export interface RefundPaymentResponse {
  _links: {
    self: {
      href: string;
      method: string;
    };
    void: {
      href: string;
      method: string;
    };
  };
  id: string;
  submitTimeUtc: string;
  status: string;
  reconciliationId: string;
  clientReferenceInformation: { code: string };
  refundAmountDetails: { refundAmount: string; currency: string };
  processorInformation: { approvalCode: string; responseCode: string };
  orderInformation: {};
}

export interface TransactionSearchResponse {
  searchId: string;
  save: boolean;
  timezone: string;
  query: string;
  offset: number;
  limit: number;
  sort: string;
  count: number;
  totalCount: number;
  submitTimeUtc: string;
  _embedded: {
    transactionSummaries: TransactionSummary[];
  };
  _links: {
    self: {
      href: string;
      method: string;
    };
  };
}

export interface TransactionSummary {
  id: string;
  submitTimeUtc: string;
  merchantId: string;
  clientReferenceInformation: {
    code: string;
    applicationName: string;
  };
  orderInformation: {
    billTo: {
      firstName: string;
      lastName: string;
      address1: string;
      email: string;
      country: string;
    };
    amountDetails?: {
      totalAmount: string;
      currency: string;
    };
  };
  paymentInformation: {
    paymentType: {
      type: string;
      method: string;
    };
    card: {
      suffix: string;
      prefix: string;
      type: string;
    };
  };
  processingInformation: {
    commerceIndicatorLabel: string;
  };
  _links: {
    transactionDetail: {
      href: string;
      method: string;
    };
  };
}
