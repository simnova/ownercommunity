import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';

interface BillingInfoProps {
  errorMessage: string;
  onSetErrorMessage: Function;
  cardNumberValidationHelpText: string;
  setCardNumberValidationHelpText: any;
  securityCodeValidationHelpText: string;
  setSecurityCodeValidationHelpText: any;
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
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
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
  }

  const onFinish = () => {
    // reset any displayed errors
    resetErrorMessages();

    // create token for customer card
    props.createToken(expirationMonth, expirationYear, async function (error: any, token: any) {
      if (error) {
        const microformError: MicroformError = error;
        processMicroformError(microformError);
      }

      form
        .validateFields()
        .then((_values) => {
          if (token) {
            console.log('TOKEN', token);
            setPaymentToken(token);
          }
        })
    });
  };

  const onCreateCustomer = async () => {
    if (paymentToken !== '') {
      await axios.post('http://localhost:7071/api/cybersource/create-customer', {
        paymentToken: paymentToken,
      }).then((response) => {
        console.log('CREATE CUSTOMER RESPONSE', response);
      }).catch((error) => {
        console.log('CREATE CUSTOMER ERROR', error);
      });
    }
  };

  const onGetCustomer = async () => {
    await axios.post('http://localhost:7071/api/cybersource/get-customer-payment-instruments', {
      customerId: '1CD4C5EE92E27A57E063AF598E0ACEC6',
    }).then((response) => {
      console.log('GET CUSTOMER RESPONSE', response);
    }).catch((error) => {
      console.log('GET CUSTOMER ERROR', error);
    });
  };

  const onProcessPaymentWithPaymentInstrument = async () => {
    await axios.post('http://localhost:7071/api/cybersource/process-payment-with-payment-instrument', {
      paymentInstrumentId: '1CC3816AF671FCC3E063AF598E0A5FA7',
    }).then((response) => {
      console.log('PROCESS PAYMENT RESPONSE', response);
    }).catch((error) => {
      console.log('PROCESS PAYMENT ERROR', error);
    });
  };

  const ErrorMessage = () => {
    return props.errorMessage ? <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}>{props.errorMessage}</div> : <></>;
  };

  return (
    <>
      <ErrorMessage />
      <Form 
        form={form}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Row>
          <Col md={12} sm={24} xs={24}>
            <Form.Item
              label={
                <div>
                  <span style={{ color: "red" }}>* </span>Card Number
                </div>
              }
              name="cardNumber"
              validateStatus="error" //error{red} validating{black} warning{yellow}
              help={props.cardNumberValidationHelpText}
              style={{ borderRadius: "6px" }}
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
                  style={{ width: '100%' }}
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
                  <span style={{ color: "red" }}>* </span> Card Security Code
                </div>
              }
              name="securityCode"
              validateStatus="error"
              help={props.securityCodeValidationHelpText}
            >
              <div id="securityCode-container"></div>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col span={14} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={() => onFinish()}>
              {'Save Card'}
            </Button>
          </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col span={14} style={{ textAlign: 'right' }}>
            <Button onClick={() => onCreateCustomer()}>
              {'Create Customer'}
            </Button>
          </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col span={14} style={{ textAlign: 'right' }}>
            <Button onClick={() => onGetCustomer()}>
              {'Get Customer Payment Instruments'}
            </Button>
          </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col span={14} style={{ textAlign: 'right' }}>
            <Button onClick={() => onProcessPaymentWithPaymentInstrument()}>
              {'Process Payment'}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}