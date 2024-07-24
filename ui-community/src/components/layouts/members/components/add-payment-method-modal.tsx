import React, { useEffect, useMemo, useState } from 'react';

import { Button, Card, DatePicker, Form, Input, Modal, Select, Skeleton, message } from 'antd';

import { Country, State, City } from 'country-state-city';

import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';
import dayjs from 'dayjs';
import { AddPaymentInstrumentInput, SharedPaymentContainercybersourcePublicKeyIdQuery } from '../../../../generated';
import { Callback, TokenOptions } from './add-payment-method-modal.container';

type PaymentTokenFormFieldType = {
  cardNumber?: string;
  securityCode?: string;
  expiration?: string;
};

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

enum STEPS {
  CARD_DETAILS = 0,
  BILLING_ADDRESS = 1,
  CONTACT_INFO = 2,
  REVIEW = 3
}

interface CustomerInfoFormSchema {
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
  isDefault: boolean;
  paymentToken: string;
}

interface AddPaymentMethodProps {
  cybersource?: SharedPaymentContainercybersourcePublicKeyIdQuery;
  onAddPaymentMethod: (data: AddPaymentInstrumentInput) => Promise<void>;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodProps> = ({ cybersource, onAddPaymentMethod }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [step, setStep] = useState(STEPS.CARD_DETAILS);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [paymentToken, setPaymentToken] = useState<string | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cardNumberValidationHelpText, setCardNumberValidationHelpText] = useState<string>('');
  const [securityCodeValidationHelpText, setSecurityCodeValidationHelpText] = useState<string>('');
  const [isCardContainerLoaded, setIsCardContainerLoaded] = useState(false);
  const [flexMicroform, setFlexMicroform] = useState<any>(null);
  const [isMicroformScriptLoaded, setScriptLoaded] = useState(false);

  const useAddPaymentMethod = useAddPaymentMethodModal();

  // const onCreateCustomer = async () => {
  //   if (paymentToken !== '') {
  //     await axios
  //       .post('http://localhost:7071/api/cybersource/create-customer', {
  //         paymentToken: paymentToken
  //       })
  //       .then((response) => {
  //         console.log('CREATE CUSTOMER RESPONSE', response);
  //       })
  //       .catch((error) => {
  //         console.log('CREATE CUSTOMER ERROR', error);
  //       });
  //   }
  // };

  const initialFormState: Partial<CustomerInfoFormSchema> = {
    billingFirstName: undefined,
    billingLastName: undefined,
    billingEmail: undefined,
    billingPhone: undefined,
    billingAddressLine1: undefined,
    billingAddressLine2: undefined,
    billingCity: undefined,
    billingState: undefined,
    billingPostalCode: undefined,
    billingCountry: undefined,
    isDefault: false,
    paymentToken: paymentToken
  };

  const [paymentTokenForm] = Form.useForm();

  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<Partial<CustomerInfoFormSchema>>(initialFormState);
  const formTitle = 'Add Payment Method';
  const onValuesChange = (changedValue: any) => {
    setFormValues({ ...formValues, ...changedValue });
  };
  const requiredFields = useMemo(() => {
    switch (step) {
      case STEPS.CARD_DETAILS:
        return ['cardNumber', 'expiration', 'securityCode'];
      case STEPS.BILLING_ADDRESS:
        return [
          'billingFistName',
          'billingLastName',
          'billingCountry',
          'billingAddressLine1',
          'billingState',
          'billingCity'
        ];
      case STEPS.CONTACT_INFO:
        return ['billingEmail', 'billingPhone'];
      default:
        return [];
    }
  }, [step]);

  const action = useMemo(() => {
    let actionLabel = 'Next';

    let onClick = () => setStep((value) => value + 1);

    if (step === STEPS.REVIEW) {
      actionLabel = 'Add Payment Method';
    }

    return (
      <Button type="primary" onClick={onClick} disabled={isNextDisabled}>
        {actionLabel}
      </Button>
    );
  }, [step, isNextDisabled]);

  const secondaryAction = useMemo(() => {
    if (step === STEPS.CARD_DETAILS) {
      return undefined;
    }
    return <Button onClick={() => setStep((value) => value - 1)}>Back</Button>;
  }, [step]);

  const createToken = (tokenOption: TokenOptions, callBack: Callback): void => {
    if (flexMicroform === null) message.error('Flex Microform is not loaded.');
    flexMicroform.createToken(tokenOption, function (error: any, token: any) {
      if (error) {
        console.log('CREATE TOKEN ERROR', error);
      } else {
        console.log('TOKEN CREATED');
      }
      callBack(error, token);
    });
  };

  const createFlexObj = (keyId: string, clearValidationText: (data: any, field: string) => void): void => {
    try {
      const flex = new (window as { [key: string]: any })['Flex'](keyId);

      // Setup styles for flex iframe
      const myStyles = {
        input: {
          'font-size': '14px',
          'font-family': 'helvetica, tahoma, calibri, sans-serif',
          color: '#555',
          'line-height': '30px'
        },
        ':focus': { color: 'black' },
        ':disabled': { cursor: 'not-allowed' },
        valid: { color: '#3c763d' },
        invalid: { color: '#a94442' },
        '::placeholder': { color: '#A4A4A4' }
      };
      const microform = flex.microform({ styles: myStyles });
      console.log('MICROFORM', microform);
      setFlexMicroform(microform);

      // Create fields
      const number = microform.createField('number', { placeholder: 'Enter card number' });
      const securityCode = microform.createField('securityCode', {
        maxLength: 4,
        placeholder: '••••',
        type: 'password'
      });

      // Add event listeners
      number.on('change', function (data: any) {
        clearValidationText(data, 'number');
      });
      securityCode.on('change', function (data: any) {
        clearValidationText(data, 'securityCode');
      });

      // Load fields
      number.load('#card-number-container');
      securityCode.load('#securityCode-container');
    } catch (error) {
      console.log('MICROFORM ERROR', error);
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, [setHasMounted]);

  useEffect(() => {}, [isCardContainerLoaded]);

  useEffect(() => {
    if (cybersource && hasMounted && useAddPaymentMethod.isOpen) {
      setIsCardContainerLoaded(false);
      console.log(`${window.location.origin.toString()}/scripts/microform-css.js`);
      let microformScript: HTMLScriptElement = document.createElement('script');
      let cssScript: HTMLScriptElement = document.createElement('script');
      cssScript.src = `${window.location.origin.toString()}/scripts/microform-css.js`;
      microformScript.src = 'https://flex.cybersource.com/cybersource/assets/microform/0.11/flex-microform.min.js';
      microformScript.async = true;
      cssScript.defer = true;
      document.body.appendChild(microformScript);
      document.body.appendChild(cssScript);
      microformScript.onload = () => {
        console.log('script loaded');
        console.log('cybersource key id', cybersource.cybersourcePublicKeyId);
        createFlexObj(cybersource?.cybersourcePublicKeyId || '', async function (data: any, field: string) {
          switch (field) {
            case 'number':
              if (data.valid === true) {
                setCardNumberValidationHelpText('');
              }
              break;
            case 'securityCode':
              if (data.valid === true) {
                setSecurityCodeValidationHelpText('');
              }
              break;
          }
        });
      };

      cssScript.onload = () => {
        console.log('css loaded');
        setScriptLoaded(true);
      };

      setIsCardContainerLoaded(true);

      return () => {
        console.log('scripts removed');
        document.body.removeChild(microformScript);
        document.body.removeChild(cssScript);
      };
    }
  }, [cybersource, hasMounted, useAddPaymentMethod.isOpen]);

  useEffect(() => {
    const checkFieldsError = async () => {
      try {
        if (step !== STEPS.CARD_DETAILS) {
          await form.validateFields(requiredFields, { validateOnly: true });
          setIsNextDisabled(false);
        }
      } catch (error) {
        setIsNextDisabled(true);
      }
    };
    checkFieldsError();
  }, [formValues, requiredFields, form]);

  useEffect(() => {
    if (paymentToken && step === STEPS.CARD_DETAILS) {
      setIsNextDisabled(false);
    } else if (!paymentToken) {
      setIsNextDisabled(true);
    }
  }, [paymentToken, step, setIsNextDisabled]);

  const paymentTokenFormFields = (
    <>
      <p>Fill out your payment method details.</p>
      <Form.Item<PaymentTokenFormFieldType>
        // className="ant-form-item-control-input-content"
        label="Card Number:"
        name="cardNumber"
        help={cardNumberValidationHelpText}
        rules={[{ required: true, message: 'Please provide the card number.' }]}
      >
        <div id="card-number-container"></div>
      </Form.Item>

      <div className="flex items-start gap-4 w-full">
        <Form.Item<PaymentTokenFormFieldType>
          label={'Card Expiration Date:'}
          required={true}
          name="expiration"
          rules={[{ required: true, message: 'Please enter the expiration date as shown on the card.' }]}
        >
          <DatePicker.MonthPicker
            id="expirationMonthPicker"
            name="expirationMonthPicker"
            placeholder="Month-Year"
            format="MM-YYYY"
            // onChange={(date: any) => onChangeExpYear(date)}
            disabledDate={(current: any) => {
              return current && current < dayjs().endOf('day').subtract(1, 'day');
            }}
          ></DatePicker.MonthPicker>
        </Form.Item>

        <Form.Item<PaymentTokenFormFieldType>
          label="Security Code:"
          name="securityCode"
          rules={[{ required: true }]}
          help={securityCodeValidationHelpText}
        >
          <div id="securityCode-container"></div>
        </Form.Item>
      </div>
    </>
  );

  let bodyContent = (
    <>
      <p>Fill out your billing address details.</p>
      <Form.Item
        name="billingFirstName"
        className="w-full"
        label="First Name:"
        rules={[{ required: true, message: 'Please enter your first name.' }]}
      >
        <Input placeholder="Enter first name" />
      </Form.Item>
      <Form.Item name="billingLastName" className="w-full" label="Last Name:" required>
        <Input placeholder="Enter last name" />
      </Form.Item>

      <Form.Item name="billingCountry" label="Country:" className="w-full" required>
        <Select
          options={Country.getAllCountries()}
          fieldNames={{ value: 'isoCode', label: 'name' }}
          showSearch
          filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
          placeholder="Select country"
        />
      </Form.Item>

      <Form.Item name="billingAddressLine1" label="Address Line 1:" required>
        <Input placeholder="Enter address line 1" />
      </Form.Item>
      <Form.Item name="billingAddressLine2" label="Address Line 2: (optional)">
        <Input placeholder="Enter address line 2" />
      </Form.Item>

      <div className="flex gap-4">
        <Form.Item name="billingState" label="State / Province:" className="w-full" required>
          <Select
            placeholder="Select state / province"
            options={State.getStatesOfCountry(formValues.billingCountry)}
            showSearch
            filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
            fieldNames={{ value: 'isoCode', label: 'name' }}
            disabled={!formValues.billingCountry}
          />
        </Form.Item>
        <Form.Item name="billingCity" label="City:" className="w-full" required>
          <Select
            placeholder="Select city"
            options={City.getCitiesOfState(formValues.billingCountry!, formValues.billingState!)}
            showSearch
            filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
            fieldNames={{ value: 'name', label: 'name' }}
            disabled={!formValues.billingCountry || !formValues.billingState}
          />
        </Form.Item>
        <Form.Item name="billingPostalCode" label="Zip Code:" className="w-full">
          <Input placeholder="Enter zip / postal code" />
        </Form.Item>
      </div>
    </>
  );

  if (step === STEPS.CONTACT_INFO) {
    const phoneCode = Country.getCountryByCode(formValues.billingCountry!)?.phonecode;
    bodyContent = (
      <>
        <Form.Item
          className="w-full"
          name="billingEmail"
          label="Email:"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail.'
            },
            {
              required: true,
              message: 'Please input your E-mail.'
            }
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="billingPhone"
          label="Phone Number:"
          rules={[{ required: true, message: 'Please input your phone number.' }]}
        >
          <Input
            placeholder="Enter phone number"
            addonBefore={
              <Select disabled={Boolean(phoneCode)} value={phoneCode} style={{ width: 70 }}>
                <Select.Option value={phoneCode}>+{phoneCode}</Select.Option>
              </Select>
            }
            maxLength={10}
          />
        </Form.Item>
      </>
    );
  }

  if (step === STEPS.REVIEW) {
    bodyContent = (
      <>
        <p>Please review your payment method details.</p>
        <div className="flex flex-col gap-4">
          <Card title="Payment Method">
            <div className="flex gap-4 items-center">
              <span>Card Number: XXXX-XXXX-XXXX-1111</span>
            </div>
            <div className="flex gap-4 items-center">
              <span>Expiration Date: 12/2023</span>
            </div>
            <div className="flex gap-4 items-center">
              <span>Security Code: ••••</span>
            </div>
          </Card>

          <Card title="Billing Information">
            <div className="flex gap-4 items-center">
              <span>Card Number: XXXX-XXXX-XXXX-1111</span>
            </div>
            <div className="flex gap-4 items-center">
              <span>Expiration Date: 12/2023</span>
            </div>
            <div className="flex gap-4 items-center">
              <span>Security Code: ••••</span>
            </div>
          </Card>
        </div>
      </>
    );
  }

  const modalFooter = (
    <div className="flex items-center justify-end gap-2">
      {secondaryAction}
      {action}
    </div>
  );

  const onSubmitPaymentTokenForm = (values: PaymentTokenFormFieldType) => {
    const tokenOption: TokenOptions = {
      expirationMonth: dayjs(values.expiration).format('MM'),
      expirationYear: dayjs(values.expiration).format('YYYY')
    };

    const callBack = async (error: any, token: any) => {
      if (token) {
        message.success('Payment token created successfully.', token);
        setPaymentToken(token);
      }
    };

    createToken(tokenOption, callBack);
  };

  return (
    <Modal
      open={useAddPaymentMethod.isOpen}
      onCancel={useAddPaymentMethod.onClose}
      title={formTitle}
      footer={modalFooter}
      centered
    >
      {step === STEPS.CARD_DETAILS && (
        <Form form={paymentTokenForm} layout="vertical">
          {paymentTokenFormFields}
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onSubmitPaymentTokenForm(paymentTokenForm.getFieldsValue())}
          >
            Token
          </Button>
        </Form>
      )}

      {step !== STEPS.CARD_DETAILS && (
        <Form
          form={form}
          layout="vertical"
          onValuesChange={onValuesChange}
          initialValues={initialFormState}
          onFinish={async () => {
            await onAddPaymentMethod({ ...formValues, paymentToken, isDefault: true } as AddPaymentInstrumentInput);
            message.success('Payment method added successfully.');
          }}
        >
          {bodyContent}
          {step === STEPS.REVIEW && (
            <Button type="primary" htmlType="submit">
              Add Payment Method
            </Button>
          )}
        </Form>
      )}
    </Modal>
  );
};

export default AddPaymentMethodModal;
