import { CustomerPaymentResponse, CustomerPaymentInstrumentsResponse, PaymentTransactionResponse, CustomerPaymentInstrumentResponse } from '../services-seedwork-payment-cybersource-interfaces';
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
    country: 'US'
  };

  const paymentToken = 'eyJraWQiOiIwODNiRkN1UHFKVlNSSFdpVXU0UXRaZmIxeDNiTzQ0NCIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjp7ImV4cGlyYXRpb25ZZWFyIjoiMjAyNCIsIm51bWJlciI6IjQxMTExMVhYWFhYWDExMTEiLCJleHBpcmF0aW9uTW9udGgiOiIwOSIsInR5cGUiOiIwMDEifSwiaXNzIjoiRmxleC8wOCIsImV4cCI6MTcyMDkxMzY0NSwidHlwZSI6Im1mLTAuMTEuMCIsImlhdCI6MTcyMDkxMjc0NSwianRpIjoiMUU1UUdXOVpDTlFHNEtKWVpERlBKVVhRUzU1TVpKRDRJWEYwTjlZNkYwM0MxNDFSRzA1VzY2OTMwRUVEMkRCQiIsImNvbnRlbnQiOnsicGF5bWVudEluZm9ybWF0aW9uIjp7ImNhcmQiOnsiZXhwaXJhdGlvblllYXIiOnsidmFsdWUiOiIyMDI0In0sIm51bWJlciI6eyJtYXNrZWRWYWx1ZSI6IlhYWFhYWFhYWFhYWDExMTEiLCJiaW4iOiI0MTExMTEifSwic2VjdXJpdHlDb2RlIjp7fSwiZXhwaXJhdGlvbk1vbnRoIjp7InZhbHVlIjoiMDkifSwidHlwZSI6eyJ2YWx1ZSI6IjAwMSJ9fX19fQ.NnqPXjWCUf7aq6OepiWwGQII6aHFHYXe4XppVZR8kV4ujfBTsYzZrxZ4msis_t68BB3nO51ZIiYgSsindufJdcTixA5ziiMhXhnBYM6ixRePBUxOSLb3EH8pcwtpbFUtpY_wJjTxMhNNQqrehjhkXm65DfHEmsyROGs5GOp91JqPoC5PTgnnfHKVen9HLe1ojV44BdfgfHiIXjNSUbnpnAmxQ1rmNN26-Jfhe7iVVaa2WTI3Ijy7UA9Xn8lAf52B2HfwKxEW03SKFFvJircqHvTxJkEizAL6-JJZVn7UKFPC9kZeMDuXoL-SL56WmyedapWdmuCGK1RNKi3AHsrA_g';
  const response: PaymentTransactionResponse = await cybersource.createCustomerProfile(customerProfile, paymentToken);

  expect(response).toBeDefined();
  expect(response.id).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  expect(response.tokenInformation.customer.id).toBeDefined();
});

test('cybersource: get customer profile', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const response: CustomerPaymentResponse = await cybersource.getCustomerProfile(customerId);

  expect(response).toBeDefined();
});

test.skip('cybersource: add customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMzNjNTQ5ZC01OWM0LTRjODMtOTczMS02NDQ4ZGQ2OTliYzAiLCJpYXQiOjE3MjA5MzE2NzQsImlzcyI6IjVkZDgzYmYwMGU0MjNkMTQ5OGRjYmFjYSIsImV4cCI6MTcyMDkzNTI3NCwiT3JnVW5pdElkIjoiNjE3MTU0MWQ2NDk5NDA1MGIyMmMyOTE5IiwiUmVmZXJlbmNlSWQiOiJiYWNhMWQ1YS03MDZhLTQyYTUtOTgwNy01YTBkNTI0MjM5OWYifQ.Ga9DRCYFPTV3FjOKwolxSNPDHBb3eYXlJA_u7MQUebA';
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
    country: 'US'
  };  
  const response: PaymentTransactionResponse = await cybersource.addCustomerPaymentInstrument(customerProfile, paymentToken);
  
  expect(response).toBeDefined();
  expect(response.id).toBeDefined();
  expect(response.status).toBe('AUTHORIZED');
  expect(response.paymentInformation.customer.id).toBe(customerId);
});

test('cybersource: get customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const response: CustomerPaymentInstrumentResponse = await cybersource.getCustomerPaymentInstrument(customerId, paymentInstrumentId);

  expect(response).toBeDefined();
});

test('cybersource: get customer payment instruments', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const response: CustomerPaymentInstrumentsResponse = await cybersource.getCustomerPaymentInstruments(customerId);

  expect(response).toBeDefined();
});

test('cybersource: delete customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentInstrumentId = '1D29F6A6FFAD7BAAE063AF598E0AA9DD';
  const response: boolean = await cybersource.deleteCustomerPaymentInstrument(customerId, paymentInstrumentId);

  expect(response).toBe(true);
});

test('cybersource: set default customer payment instrument', async () => {
  const customerId = '1CD4C5EE92E27A57E063AF598E0ACEC6';
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const response: CustomerPaymentResponse = await cybersource.setDefaultCustomerPaymentInstrument(customerId, paymentInstrumentId);

  expect(response).toBeDefined();
});

test('cybersource: process payment', async () => {
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const amount = 100;
  const response: PaymentTransactionResponse = await cybersource.processPayment(paymentInstrumentId, amount);

  expect(response).toBeDefined();
});

test('cybersource: refund payment', async () => {
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const amount = 100;
  const response: PaymentTransactionResponse = await cybersource.refundPayment(paymentInstrumentId, amount);

  expect(response).toBeDefined();
});

test('cybersource: void payment', async () => {
  const paymentInstrumentId = '1D29E9E8A73A6A8AE063AF598E0AB009';
  const amount = 100;
  const response: PaymentTransactionResponse = await cybersource.voidPayment(paymentInstrumentId, amount);

  expect(response).toBeDefined();
});