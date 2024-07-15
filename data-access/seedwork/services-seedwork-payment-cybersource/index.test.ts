import {
  CustomerPaymentResponse,
  CustomerPaymentInstrumentsResponse,
  PaymentTransactionResponse,
  CustomerPaymentInstrumentResponse,
} from '../services-seedwork-payment-cybersource-interfaces';
import { Cybersource } from './index';

let cybersource;

beforeEach(() => {
  cybersource = new Cybersource();
});

test.skip('cybersource: generate key', async () => {
  const publicKeyId = await cybersource.generatePublicKey();

  expect(publicKeyId).toBeDefined();
  expect(publicKeyId).toMatch(/^eyJraWQiOi/);
});

test.skip('cybersource: create customer profile', async () => {
  const customerProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@cybs.com',
    phone: '1234567890',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 1',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'US',
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
  const paymentToken =
    'eyJraWQiOiIwOFJzVGxLcXp3Zjl5SHhRa0FDd0RJS2l4ckREcURyYyIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjp7ImV4cGlyYXRpb25ZZWFyIjoiMjAyNCIsIm51bWJlciI6IjQxMTExMVhYWFhYWDExMTEiLCJleHBpcmF0aW9uTW9udGgiOiIxMiIsInR5cGUiOiIwMDEifSwiaXNzIjoiRmxleC8wOCIsImV4cCI6MTcyMDk5ODYxMSwidHlwZSI6Im1mLTAuMTEuMCIsImlhdCI6MTcyMDk5NzcxMSwianRpIjoiMUU1WTY2VldLT1o3UDJHRFBZOTdWTUtUSU84S0w3QldJVDhSVzVINzVOVFg5NU9LV084VTY2OTQ1QUQzOUJBNiIsImNvbnRlbnQiOnsicGF5bWVudEluZm9ybWF0aW9uIjp7ImNhcmQiOnsiZXhwaXJhdGlvblllYXIiOnsidmFsdWUiOiIyMDI0In0sIm51bWJlciI6eyJtYXNrZWRWYWx1ZSI6IlhYWFhYWFhYWFhYWDExMTEiLCJiaW4iOiI0MTExMTEifSwic2VjdXJpdHlDb2RlIjp7fSwiZXhwaXJhdGlvbk1vbnRoIjp7InZhbHVlIjoiMTIifSwidHlwZSI6eyJ2YWx1ZSI6IjAwMSJ9fX19fQ.wUYMT7TjkzNWTm8mcK3YmXEESGu15awAZZXpYY5B_TvHaYyNqF58iDTBG4GwBpXZIYCeBGJ86y2Tbm7y0gdJ302sr6dgmMgYeChVQuOyLZBjdllaUmxdttVo8RFz45aTgDseTHQDSBZco0uVnQIdOYj4E1P1T4dP-FHMpvov-F5Dum5FMgkHeyzzfnwyRf_9ZdesxIITuN56cKKOnWdr-DRjSvJD6ByCeDhgWq-jUsNg7crcU1FZijYevfiA1WklUAtBjorgNGTul6QTzpUUblZMbUI8uGjGCIeUnJHEtboxRC9FcP7W_j7n6nBkna6H-5urPghVABs_Jdz8nXQ-_Q';
  const customerProfile = {
    customerId: customerId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@cybs.com',
    phone: '1234567890',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 1',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'US',
  };
  const response: PaymentTransactionResponse = await cybersource.addCustomerPaymentInstrument(customerProfile, paymentToken);

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
  const clientReferenceCode = 'TC55971_4';
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const amount: number = 100.55;
  const response: PaymentTransactionResponse = await cybersource.processPayment(clientReferenceCode, paymentInstrumentId, amount);

  expect(response).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  expect(response.orderInformation.amountDetails.totalAmount).toBe(amount.toString());
  expect(response.orderInformation.amountDetails.authorizedAmount).toBe(amount.toString());
  expect(response.processorInformation.approvalCode).toEqual('888888');
  expect(response.processorInformation.transactionId).toBeDefined();
});

test.skip('cybersource: refund payment', async () => {
  const clientReferenceCode = 'TC55971_4';
  const amount: number = 100.55;
  const response: PaymentTransactionResponse = await cybersource.refundPayment(clientReferenceCode, amount);

  expect(response).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  //expect(response.orderInformation.amountDetails.authorizedAmount).toBe(amount.toString());
  //expect(response.processorInformation.approvalCode).toEqual('888888');
  //expect(response.processorInformation.transactionId).toBeDefined();
  // expect below
  // refundId: refundResponse.id,
  // responseCode: refundResponse.processorInformation.responseCode
});

test.skip('cybersource: void payment', async () => {
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const amount: number = 199.99;
  const response: PaymentTransactionResponse = await cybersource.voidPayment(paymentInstrumentId, amount);

  expect(response).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  expect(response.orderInformation.amountDetails.authorizedAmount).toBe(amount.toString());
  expect(response.processorInformation.approvalCode).toEqual('888888');
  expect(response.processorInformation.transactionId).toBeDefined();
});
