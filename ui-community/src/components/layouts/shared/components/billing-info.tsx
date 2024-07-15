import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';

interface BillingInfoProps {
  errorMessage: string;
  onSetErrorMessage: Function;
  cardNumberValidationHelpText: string;
  setCardNumberValidationHelpText: React.Dispatch<React.SetStateAction<string>>;
  securityCodeValidationHelpText: string;
  setSecurityCodeValidationHelpText: React.Dispatch<React.SetStateAction<string>>;
  onCardNumberContainerLoaded: () => void;
  createToken: (expirationMonth: string, expirationYear: string, callBack: any) => void;
}

const MonthPicker = DatePicker.MonthPicker;
dayjs.extend(customParseFormat);

type MicroformError = {
  correlationId: string;
  details: MicroformDetails[];
  informationLink: string;
  message: string;
  name: string;
  reason: string; //CREATE_TOKEN_VALIDATION_SERVERSIDE / CREATE_TOKEN_VALIDATION_FIELDS
};

type MicroformDetails = {
  location: string;
  message: string;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
};

export const BillingInfo: React.FC<BillingInfoProps> = (props) => {
  const [form] = Form.useForm();
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [paymentToken, setPaymentToken] = useState('');

  useEffect(() => {
    props.onCardNumberContainerLoaded();
  }, []);

  const resetErrorMessages = () => {
    // reset any displayed errors
    props.setCardNumberValidationHelpText('');
    props.setSecurityCodeValidationHelpText('');
  };

  const onChangeExpYear = (date: dayjs.Dayjs | null) => {
    if (date !== null) {
      setExpirationMonth(date.format('M').padStart(2, '0'));
      setExpirationYear(date.format('YYYY'));
    } else {
      setExpirationMonth('');
      setExpirationYear('');
    }
  };

  const processMicroformError = (error: MicroformError) => {
    switch (error.reason) {
      case 'CREATE_TOKEN_VALIDATION_SERVERSIDE': {
        props.onSetErrorMessage('Payment failed due to expired token. Please refresh the screen and try again.');
        break;
      }
      case 'CREATE_TOKEN_VALIDATION_FIELDS': {
        // Credit Card and/or CVV is not valid
        error.details.forEach((detail: MicroformDetails, _index: number) => {
          if (detail.location === 'number') {
            props.setCardNumberValidationHelpText('Please enter a valid card number.');
          } else if (detail.location === 'securityCode') {
            props.setSecurityCodeValidationHelpText('Please enter the security code as shown on the card.');
          }
        });
        break;
      }
    }
  };

  const onCreateToken = () => {
    // reset any displayed errors
    resetErrorMessages();

    // create token for customer card
    props.createToken(expirationMonth, expirationYear, async function (error: any, token: any) {
      if (error) {
        const microformError: MicroformError = error;
        processMicroformError(microformError);
      }

      form.validateFields().then((_values) => {
        if (token) {
          console.log('Payment Token', token);
          setPaymentToken(token);
        }
      });
    });
  };

  const onCreateCustomer = async () => {
    if (paymentToken !== '') {
      await axios
        .post('http://localhost:7071/api/cybersource/create-customer', {
          paymentToken: paymentToken
        })
        .then((response) => {
          console.log('CREATE CUSTOMER RESPONSE', response);
        })
        .catch((error) => {
          console.log('CREATE CUSTOMER ERROR', error);
        });
    }
  };

  const onGetCustomerPaymentInstruments = async () => {
    await axios
      .post('http://localhost:7071/api/cybersource/get-customer-payment-instruments', {
        customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6'
      })
      .then((response) => {
        console.log('GET PAYMENT INSTRUMENTS RESPONSE', response);
      })
      .catch((error) => {
        console.log('GET PAYMENT INSTRUMENTS ERROR', error);
      });
  };

  const onAddCustomerPaymentInstrument = async () => {
    await axios
      .post('http://localhost:7071/api/cybersource/add-customer-payment-instrument', {
        customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6',
        paymentToken: paymentToken
      })
      .then((response) => {
        console.log('ADD PAYMENT INSTRUMENT RESPONSE', response);
      })
      .catch((error) => {
        console.log('ADD PAYMENT INSTRUMENT ERROR', error);
      });
  };

  const onDeleteCustomerPaymentInstrument = async () => {
    await axios
      .post('http://localhost:7071/api/cybersource/delete-customer-payment-instrument', {
        customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6',
        paymentInstrumentId: '1CE627A481F7E175E063AF598E0AF73D'
      })
      .then((response) => {
        console.log('DELETE PAYMENT INSTRUMENT RESPONSE', response);
      })
      .catch((error) => {
        console.log('DELETE PAYMENT INSTRUMENT ERROR', error);
      });
  };

  const onProcessPaymentWithPaymentInstrument = async () => {
    await axios
      .post('http://localhost:7071/api/cybersource/process-payment-with-payment-instrument', {
        paymentInstrumentId: '1CC3816AF671FCC3E063AF598E0A5FA7'
      })
      .then((response) => {
        console.log('PROCESS PAYMENT RESPONSE', response);
      })
      .catch((error) => {
        console.log('PROCESS PAYMENT ERROR', error);
      });
  };

  const onUpdateCustomerDefaultPaymentInstrument = async () => {
    await axios
      .post('http://localhost:7071/api/cybersource/update-customer-default-payment-instrument', {
        customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6',
        paymentInstrumentId: '1CD4BF677E8742EAE063AF598E0AEF98'
      })
      .then((response) => {
        console.log('UPDATE DEFAULT PAYMENT INSTRUMENT RESPONSE', response);
      })
      .catch((error) => {
        console.log('UPDATE DEFAULT PAYMENT INSTRUMENT ERROR', error);
      });
  };

  const ErrorMessage = () => {
    return props.errorMessage ? (
      <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}>{props.errorMessage}</div>
    ) : (
      <></>
    );
  };

  return (
    <>
      <ErrorMessage />
      <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label={
            <div>
              <span style={{ color: 'red' }}>* </span>Card Number
            </div>
          }
          name="cardNumber"
          validateStatus="error" //error{red} validating{black} warning{yellow}
          help={props.cardNumberValidationHelpText}
          style={{ borderRadius: '6px' }}
        >
          <div id="card-number-container"></div>
        </Form.Item>

        <Form.Item
          label={'Card Expiration Date:'}
          required={true}
          style={{ marginTop: '2px', width: '100%' }}
          name="expirationMonthPicker"
          rules={[{ required: true, message: 'Please enter the expiration date as shown on the card.' }]}
        >
          <MonthPicker
            id="expirationMonthPicker"
            name="expirationMonthPicker"
            placeholder="Month-Year"
            format="MM-YYYY"
            onChange={(date: any) => onChangeExpYear(date)}
            disabledDate={(current: any) => {
              return current && current < dayjs().endOf('day').subtract(1, 'day');
            }}
          ></MonthPicker>
        </Form.Item>

        <Form.Item
          label={
            <div>
              <span style={{ color: 'red' }}>* </span> Card Security Code
            </div>
          }
          name="securityCode"
          validateStatus="error"
          help={props.securityCodeValidationHelpText}
        >
          <div id="securityCode-container"></div>
        </Form.Item>

        <Button type="primary" htmlType="submit" onClick={() => onCreateToken()}>
          {'Save Card and get Payment Token'}
        </Button> <br /> <br />

        <Button onClick={() => onCreateCustomer()}>{'Create Customer'}</Button> <br /> <br />

        <Button onClick={() => onGetCustomerPaymentInstruments()}>{'Get Customer Payment Instruments'}</Button> <br /> <br />

        <Button onClick={() => onAddCustomerPaymentInstrument()}>{'Add Customer Payment Instrument'}</Button> <br /> <br />

        <Button onClick={() => onDeleteCustomerPaymentInstrument()}>{'Delete Customer Payment Instrument'}</Button> <br /> <br />

        <Button onClick={() => onProcessPaymentWithPaymentInstrument()}>{'Process Payment'}</Button> <br /> <br />

        <Button onClick={() => onUpdateCustomerDefaultPaymentInstrument()}>
          {'Update Customer Default Payment Instrument'}
        </Button>
      </Form>
    </>
  );
};