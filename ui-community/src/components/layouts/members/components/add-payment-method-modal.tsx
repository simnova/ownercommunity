import React, { useEffect, useMemo, useState } from 'react';

import { Button, Card, Checkbox, DatePicker, Form, Input, Modal, Select, message } from 'antd';

import { Country, State, City } from 'country-state-city';

import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';
import dayjs from 'dayjs';
import {
  AddPaymentInstrumentInput,
  MutationMemberAddPaymentInstrumentMutation,
  SharedPaymentContainercybersourcePublicKeyIdQuery
} from '../../../../generated';
import { Callback, TokenOptions } from './add-payment-method-modal.container';
import { FetchResult } from '@apollo/client';

type PaymentTokenFormFieldType = {
  cardNumber?: string;
  securityCode?: string;
  expiration?: string;
  isDefault: boolean;
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
  onAddPaymentMethod: (
    data: AddPaymentInstrumentInput
  ) => Promise<FetchResult<MutationMemberAddPaymentInstrumentMutation> | undefined>;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodProps> = ({ cybersource, onAddPaymentMethod }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [step, setStep] = useState(STEPS.CARD_DETAILS);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [paymentToken, setPaymentToken] = useState<string | undefined>(undefined);
  const [isDefaultPaymentMethod, setIsDefaultPaymentMethod] = useState<boolean>(false);
  const [isPaymentTokenLoading, setIsPaymentTokenLoading] = useState<boolean>(false);

  const [cardNumberValidationHelpText, setCardNumberValidationHelpText] = useState<string>('');
  const [securityCodeValidationHelpText, setSecurityCodeValidationHelpText] = useState<string>('');
  const [flexMicroform, setFlexMicroform] = useState<any>(null);

  const useAddPaymentMethod = useAddPaymentMethodModal();

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
  const values = Form.useWatch([], form);
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
          'billingFirstName',
          'billingLastName',
          'billingCountry',
          'billingAddressLine1',
          'billingState',
          'billingCity',
          'billingPostalCode'
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
      return null;
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

  const createToken = (tokenOption: TokenOptions, callBack: Callback) => {
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

  useEffect(() => {
    if (cybersource && hasMounted && useAddPaymentMethod.isOpen) {
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
      };

      return () => {
        console.log('scripts removed');
        document.body.removeChild(microformScript);
        document.body.removeChild(cssScript);
      };
    }
  }, [cybersource, hasMounted, useAddPaymentMethod.isOpen]);

  useEffect(() => {
    if (step !== STEPS.CARD_DETAILS) {
      form
        .validateFields(requiredFields, { validateOnly: true })
        .then(() => {
          setIsNextDisabled(false);
        })
        .catch(() => setIsNextDisabled(true));
    }
  }, [values, requiredFields, form, step]);

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
      <Form.Item<PaymentTokenFormFieldType> name="isDefault">
        <Checkbox value={isDefaultPaymentMethod} onChange={(e) => setIsDefaultPaymentMethod(e.target.checked)}>
          Deafult payment method
        </Checkbox>
      </Form.Item>
    </>
  );

  let bodyContent = (
    <>
      <p>Fill out your billing address details.</p>
      <Form.Item name="billingFirstName" className="w-full" label="First Name:" rules={[{ required: true }]}>
        <Input placeholder="Enter first name" />
      </Form.Item>
      <Form.Item name="billingLastName" className="w-full" label="Last Name:" rules={[{ required: true }]}>
        <Input placeholder="Enter last name" />
      </Form.Item>

      <Form.Item name="billingCountry" label="Country:" className="w-full" rules={[{ required: true }]}>
        <Select
          options={Country.getAllCountries()}
          fieldNames={{ value: 'isoCode', label: 'name' }}
          showSearch
          filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
          placeholder="Select country"
        />
      </Form.Item>

      <Form.Item name="billingAddressLine1" label="Address Line 1:" rules={[{ required: true }]}>
        <Input placeholder="Enter address line 1" />
      </Form.Item>
      <Form.Item name="billingAddressLine2" label="Address Line 2: (optional)">
        <Input placeholder="Enter address line 2" />
      </Form.Item>

      <div className="flex gap-4">
        <Form.Item name="billingState" label="State / Province:" className="w-full" rules={[{ required: true }]}>
          <Select
            placeholder="Select state / province"
            options={State.getStatesOfCountry(values?.billingCountry)}
            showSearch
            filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
            fieldNames={{ value: 'isoCode', label: 'name' }}
            disabled={!values?.billingCountry}
          />
        </Form.Item>
        <Form.Item name="billingCity" label="City:" className="w-full" rules={[{ required: true }]}>
          <Select
            placeholder="Select city"
            options={City.getCitiesOfState(values?.billingCountry!, values?.billingState!)}
            showSearch
            filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
            fieldNames={{ value: 'name', label: 'name' }}
            disabled={!values?.billingCountry || !values?.billingState}
          />
        </Form.Item>
        <Form.Item name="billingPostalCode" label="Zip Code:" className="w-full" rules={[{ required: true }]}>
          <Input placeholder="Enter zip / postal code" />
        </Form.Item>
      </div>
    </>
  );

  if (step === STEPS.CONTACT_INFO) {
    const phoneCode = Country.getCountryByCode(form.getFieldValue('billingCountry'))?.phonecode;

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
          <Card title="Billing Information">
            <div className="flex flex-col gap-2">
              <span>First Name: {form.getFieldValue('billingFirstName')}</span>
              <span>Last Name: {form.getFieldValue('billingLastName')}</span>
              <span>Email: {form.getFieldValue('billingEmail')}</span>
              <span>Phone: {form.getFieldValue('billingPhone')}</span>
              <span>Address Line 1: {form.getFieldValue('billingAddressLine1')}</span>
              <span>Address Line 2: {form.getFieldValue('billingAddressLine2')}</span>
              <span>City: {form.getFieldValue('billingCity')}</span>
              <span>State: {form.getFieldValue('billingState')}</span>
              <span>Country: {form.getFieldValue('billingCountry')}</span>
              <span>Zip Code: {form.getFieldValue('billingPostalCode')}</span>
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
      if (error) {
        message.error('An error occurred while creating the payment token.');
        return;
      }
      setIsPaymentTokenLoading(true);
      if (token) {
        setPaymentToken(token);
        setStep((value) => value + 1);
      }
      setIsPaymentTokenLoading(false);
    };

    createToken(tokenOption, callBack);
  };

  return (
    <Modal
      open={useAddPaymentMethod.isOpen}
      onCancel={useAddPaymentMethod.onClose}
      title={formTitle}
      footer={<div></div>}
      centered
    >
      {step === STEPS.CARD_DETAILS && (
        <Form form={paymentTokenForm} layout="vertical">
          {paymentTokenFormFields}
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onSubmitPaymentTokenForm(paymentTokenForm.getFieldsValue())}
              loading={isPaymentTokenLoading}
            >
              Next
            </Button>
          </div>
        </Form>
      )}

      {step !== STEPS.CARD_DETAILS && (
        <Form
          form={form}
          layout="vertical"
          onValuesChange={onValuesChange}
          initialValues={initialFormState}
          onFinish={async () => {
            const input = {
              ...formValues,
              paymentToken,
              isDefault: isDefaultPaymentMethod
            } as AddPaymentInstrumentInput;
            console.log('FORM VALUES', input);
            const response = await onAddPaymentMethod({
              ...formValues,
              paymentToken,
              isDefault: isDefaultPaymentMethod
            } as AddPaymentInstrumentInput);
            if (response?.errors) {
              message.error('An error occurred while adding the payment method.');
            } else if (response?.data?.memberAddPaymentInstrument.status.success) {
              message.success('Payment method added successfully.');
              form.resetFields();
              // set stepstate to card details
              setStep(STEPS.CARD_DETAILS);
              document.getElementById('expirationMonthPicker')?.setAttribute('value', '');
              paymentTokenForm.setFieldsValue({ expiration: undefined });
              useAddPaymentMethod.onClose();
            }
          }}
        >
          {bodyContent}

          <div className="flex gap-2 justify-end mt-6">
            {modalFooter}
            {step === STEPS.REVIEW && (
              <Button type="primary" htmlType="submit">
                Add Payment Method
              </Button>
            )}
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default AddPaymentMethodModal;
