import {
  CustomerPaymentResponse,
  CustomerPaymentInstrumentsResponse,
  PaymentTransactionResponse,
  CustomerPaymentInstrumentResponse,
  RefundPaymentResponse,
  CustomerProfile,
  PaymentTokenInfo,
  TransactionSearchResponse,
} from '../services-seedwork-payment-cybersource-interfaces';
import { Cybersource } from './index';

let cybersource: Cybersource;

beforeEach(() => {
  cybersource = new Cybersource();
});

test.skip('cybersource: generate key', async () => {
  const publicKeyId = await cybersource.generatePublicKey();

  expect(publicKeyId).toBeDefined();
  expect(publicKeyId).toMatch(/^eyJraWQiOi/);
});

test.skip('cybersource: create customer profile', async () => {
  const customerProfile: CustomerProfile = {
    billingFirstName: 'John',
    billingLastName: 'Doe',
    billingEmail: 'test@cybs.com',
    billingPhone: '1234567890',
    billingAddressLine1: '123 Main St',
    billingAddressLine2: 'Apt 1',
    billingCity: 'San Francisco',
    billingState: 'CA',
    billingPostalCode: '94107',
    billingCountry: 'US',
  };
  const paymentToken =
    'eyJraWQiOiIwOHhzQXRXNTBBdlFQN01TSVVWdUlsWjRieXFqanlnTCIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjp7ImV4cGlyYXRpb25ZZWFyIjoiMjAyNCIsIm51bWJlciI6IjQxMTExMVhYWFhYWDExMTEiLCJleHBpcmF0aW9uTW9udGgiOiIxMiIsInR5cGUiOiIwMDEifSwiaXNzIjoiRmxleC8wOCIsImV4cCI6MTcyMDk5NTIzNiwidHlwZSI6Im1mLTAuMTEuMCIsImlhdCI6MTcyMDk5NDMzNiwianRpIjoiMUU1MFQyQ0VSUFRTV1kxVlNGTTZJS1VJMVc0UDJFNzQ3Wlc0SjA4S1ZFR0M2WDVWRjlJWDY2OTQ0REE0NzVDQiIsImNvbnRlbnQiOnsicGF5bWVudEluZm9ybWF0aW9uIjp7ImNhcmQiOnsiZXhwaXJhdGlvblllYXIiOnsidmFsdWUiOiIyMDI0In0sIm51bWJlciI6eyJtYXNrZWRWYWx1ZSI6IlhYWFhYWFhYWFhYWDExMTEiLCJiaW4iOiI0MTExMTEifSwic2VjdXJpdHlDb2RlIjp7fSwiZXhwaXJhdGlvbk1vbnRoIjp7InZhbHVlIjoiMTIifSwidHlwZSI6eyJ2YWx1ZSI6IjAwMSJ9fX19fQ.AT3PBlrFhVQf_Bq8N_99KCClelZYSRC4EJ1sFdzZHHB4I2lU8NmuquFNEMa9Ikrx8vSdNhqU2z5VRIKPuDGe1fLpBO_Og9I5UjAZwumCnXv4iQXaped9TfVYMwJXw01Ps7L5wBYZkMC9tMZjvBaUgEE7__qbBrjX6ZeEw1SV88WKFECtaCH9xslydv_MjsSbut8OxoC-5H4AbNtUiQyzQOynOwFbwJ2d6FA5h4YAzDclN_xM6jgzHfF9RqoHJryxEYsBD9BVEjytMAi73l-mXbsq1nIWSyzOKqiQ2EAy-FG2P6CBBlEjeOp-vP1Xojsh4nvOK9QFG2c0FPt2rYoxpQ';
  const response: PaymentTransactionResponse = await cybersource.createCustomerProfile(customerProfile, paymentToken);

  expect(response).toBeDefined();
  expect(response.id).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  expect(response.tokenInformation.customer.id).toBeDefined();
});

test.skip('cybersource: get customer profile', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const response: CustomerPaymentResponse = await cybersource.getCustomerProfile(customerId);

  expect(response).toBeDefined();
  expect(response._embedded.defaultPaymentInstrument.id).toBeDefined();
  expect(response._embedded.defaultPaymentInstrument.state).toBe('ACTIVE');
  expect(response._embedded.defaultPaymentInstrument._embedded.instrumentIdentifier.card.number).toEqual('411111XXXXXX1111');
});

test.skip('cybersource: add customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentTokenInfo: PaymentTokenInfo = {
    paymentToken: 'eyJraWQiOiIwOGJtNkt3TDZCV010a0xwT2hlTEg3NEJQdUpzOE1reCIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjp7ImV4cGlyYXRpb25ZZWFyIjoiMjAyNCIsIm51bWJlciI6IjQxMTExMVhYWFhYWDExMTEiLCJleHBpcmF0aW9uTW9udGgiOiIxMiIsInR5cGUiOiIwMDEifSwiaXNzIjoiRmxleC8wOCIsImV4cCI6MTcyMTE4NzI0NywidHlwZSI6Im1mLTAuMTEuMCIsImlhdCI6MTcyMTE4NjM0NywianRpIjoiMUUwRjY4U0lGTzdCRDhFR1FSNUZSNUg3V1AyMlo1ME0yVDI1SzA4RU5QRDBFUzQ3WkdOQjY2OTczQkFGQUJBNCIsImNvbnRlbnQiOnsicGF5bWVudEluZm9ybWF0aW9uIjp7ImNhcmQiOnsiZXhwaXJhdGlvblllYXIiOnsidmFsdWUiOiIyMDI0In0sIm51bWJlciI6eyJtYXNrZWRWYWx1ZSI6IlhYWFhYWFhYWFhYWDExMTEiLCJiaW4iOiI0MTExMTEifSwic2VjdXJpdHlDb2RlIjp7fSwiZXhwaXJhdGlvbk1vbnRoIjp7InZhbHVlIjoiMTIifSwidHlwZSI6eyJ2YWx1ZSI6IjAwMSJ9fX19fQ.liQ4mL-QAnZKEIIzWvUBANEbG551RBkiuGUqE-dpUFjPLGS4nUg817ovQU3hMu3jkRUNvWQWrX0NUMgHFskicK8kzXi_0tF4Sgon0ZjODvBdNpjliFUZI-nHUHtCzTULWzMTyP47rSNKiW-OuuoKMDvAMVgJTzXGp96jwR9vLSS8jcTLFF9SeVe5G0Gmz_NMaYXli55WNOE02eO15QGTRVXIGmhHOEKNsNd3iiqPR31EcXdcCfYP9qp7YzaQLukenHWvy87hIQgA0grFmv2CiAOPxJMN2IfRYJ1Sbt6Wx724aVri819dIp8HqpYDNkcE28alO8wnZ9aQPc45rv8t7w',
    isDefault: true,
  };

  const customerProfile: CustomerProfile = {
    customerId: customerId,
    billingFirstName: 'John',
    billingLastName: 'Doe',
    billingEmail: 'test@cybs.com',
    billingPhone: '1234567890',
    billingAddressLine1: '123 Main St',
    billingAddressLine2: 'Apt 1',
    billingCity: 'San Francisco',
    billingState: 'CA',
    billingPostalCode: '94107',
    billingCountry: 'US',
  };
  const response: PaymentTransactionResponse = await cybersource.addCustomerPaymentInstrument(customerProfile, paymentTokenInfo);

  expect(response).toBeDefined();
  expect(response.id).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  expect(response.paymentInformation.customer.id).toBe(customerId);
  expect(response.tokenInformation.instrumentIdentifier.state).toBe('ACTIVE');
});

test.skip('cybersource: get customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const response: CustomerPaymentInstrumentResponse = await cybersource.getCustomerPaymentInstrument(customerId, paymentInstrumentId);

  expect(response).toBeDefined();
  expect(response.billTo).toBeDefined();
  expect(response._embedded.instrumentIdentifier.card.number).toEqual('411111XXXXXX1111');
});

test.skip('cybersource: get customer payment instruments', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const response: CustomerPaymentInstrumentsResponse = await cybersource.getCustomerPaymentInstruments(customerId);

  expect(response).toBeDefined();
  expect(response.total).toBeGreaterThan(0);
  expect(response._embedded.paymentInstruments.length).toBeGreaterThan(0);
});

test.skip('cybersource: delete customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentInstrumentId = '1D29F6A6FFAD7BAAE063AF598E0AA9DD';
  const response: boolean = await cybersource.deleteCustomerPaymentInstrument(customerId, paymentInstrumentId);

  expect(response).toBe(true);
});

test.skip('cybersource: set default customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const response: CustomerPaymentResponse = await cybersource.setDefaultCustomerPaymentInstrument(customerId, paymentInstrumentId);

  expect(response).toBeDefined();
  expect(response._embedded.defaultPaymentInstrument.id).toBe(paymentInstrumentId);
});

test.skip('cybersource: process payment', async () => {
  const clientReferenceCode = 'TC55971_409';
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const amount: number = 409.55;
  const response: PaymentTransactionResponse = await cybersource.processPayment(clientReferenceCode, paymentInstrumentId, amount);

  expect(response).toBeDefined();
  expect(response.id).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  expect(response.orderInformation.amountDetails.totalAmount).toBe(amount.toString());
  expect(response.orderInformation.amountDetails.authorizedAmount).toBe(amount.toString());
  expect(response.processorInformation.approvalCode).toEqual('888888');
});

test.skip('cybersource: refund payment', async () => {
  const transactionId = '7211911042206903303955';
  const amount: number = 405.55;
  const response: RefundPaymentResponse = await cybersource.refundPayment(transactionId, amount);

  expect(response).toBeDefined();
  expect(response.status).toBe('PENDING');
  expect(response.processorInformation.responseCode).toBe('100');
  expect(response.refundAmountDetails.refundAmount).toBe(amount.toString());
});

test.skip('cybersource: void payment', async () => {
  // payments can only be voided if Cybersource has not already submitted the payment to the payment processor
  const clientReferenceCode = 'TC55971_409';
  const transactionId = '7211916138596003903955';
  const amount: number = 409.55;
  const response: PaymentTransactionResponse = await cybersource.voidPayment(clientReferenceCode, transactionId);

  expect(response).toBeDefined();
  expect(response.status).toBe('VOIDED');
  expect(response.voidAmountDetails.voidAmount).toBe(amount.toString());
});

test.skip('cybersource: search payment transaction', async () => {
  const clientReferenceCode = 'TC55971_409';
  const response: TransactionSearchResponse = await cybersource.searchTransactions(clientReferenceCode);

  expect(response).toBeDefined();
  expect(response._embedded.transactionSummaries.length).toBeGreaterThan(0);
});
