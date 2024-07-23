import React, { useEffect, useMemo, useState } from 'react';

import { Button, Card, DatePicker, Form, Input, Modal, Select } from 'antd';

import { Country, State, City } from 'country-state-city';

import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';
import dayjs from 'dayjs';
import { AddPaymentInstrumentInput } from '../../../../generated';
import { Callback, TokenOptions } from './add-payment-method-modal.container';

type PaymentTokenFormFieldType = {
  cardNumber?: string;
  securityCode?: string;
  expiration?: string;
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
  onCreateToken: (tokenOption: TokenOptions, callBack: Callback) => void;
  onAddPaymentMethod: (data: AddPaymentInstrumentInput) => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodProps> = ({ onCreateToken }) => {
  const [step, setStep] = useState(STEPS.CARD_DETAILS);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [paymentToken, setPaymentToken] = useState('');

  const useAddPaymentMethod = useAddPaymentMethodModal();

  const onSubmitPaymentTokenForm = (data: PaymentTokenFormFieldType) => {
    const tokenOption: TokenOptions = {
      expirationMonth: dayjs(data.expiration).format('MM'),
      expirationYear: dayjs(data.expiration).format('YYYY')
    };

    const callBack = async (error: any, token: any) => {
      if (error) {
      } else if (token) {
        setPaymentToken(token);
      }
    };

    onCreateToken(tokenOption, callBack);
  };

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
          'billToForename',
          'billToLastName',
          'billToAddressCountry',
          'billToAddressLine1',
          'billToAddressState',
          'billToAddressCity'
        ];
      case STEPS.CONTACT_INFO:
        return ['billToEmail', 'phone'];
      default:
        return [];
    }
  }, [step]);

  const action = useMemo(() => {
    let actionLabel = 'Next';

    let onClick = () => setStep((value) => value + 1);

    if (step === STEPS.CARD_DETAILS) {
      onClick = () => {
        onSubmitPaymentTokenForm(paymentTokenForm.getFieldsValue());
        setStep((value) => value + 1);
      };
    }

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

  useEffect(() => {
    const checkFieldsError = async () => {
      try {
        if (step === STEPS.CARD_DETAILS) {
          await paymentTokenForm.validateFields(requiredFields, { validateOnly: true });
        } else await form.validateFields(requiredFields, { validateOnly: true });
        setIsNextDisabled(false);
      } catch (error) {
        setIsNextDisabled(true);
      }
    };
    checkFieldsError();
  }, [formValues, requiredFields, form]);

  let bodyContent = (
    <>
      <p>Fill out your payment method details.</p>
      <Form.Item<PaymentTokenFormFieldType>
        // className="ant-form-item-control-input-content"
        label="Card Number:"
        name="cardNumber"
        // help={props.cardNumberValidationHelpText}
        rules={[{ required: true, message: 'Please provide the card number.' }]}
      >
        {/* <Card id="card-number-container" className="h-9 px-2"></Card> */}
        <Input placeholder="Enter card number" />
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
          // help={props.securityCodeValidationHelpText}
        >
          {/* <Card id="securityCode-container" className="h-9 px-2"></Card> */}
          <Input placeholder="Enter security code" />
        </Form.Item>
      </div>
    </>
  );

  if (step === STEPS.BILLING_ADDRESS) {
    bodyContent = (
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

        <Form.Item name="billToAddressCountry" label="Country:" className="w-full" required>
          <Select
            options={Country.getAllCountries()}
            fieldNames={{ value: 'isoCode', label: 'name' }}
            showSearch
            filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
            placeholder="Select country"
          />
        </Form.Item>

        <Form.Item name="billToAddressLine1" label="Address Line 1:" required>
          <Input placeholder="Enter address line 1" />
        </Form.Item>
        <Form.Item name="billToAddressLine2" label="Address Line 2: (optional)">
          <Input placeholder="Enter address line 2" />
        </Form.Item>

        <div className="flex gap-4">
          <Form.Item name="billToAddressState" label="State / Province:" className="w-full" required>
            <Select
              placeholder="Select state / province"
              options={State.getStatesOfCountry(formValues.billingCountry)}
              showSearch
              filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
              fieldNames={{ value: 'isoCode', label: 'name' }}
              disabled={!formValues.billingCountry}
            />
          </Form.Item>
          <Form.Item name="billToAddressCity" label="City:" className="w-full" required>
            <Select
              placeholder="Select city"
              options={City.getCitiesOfState(formValues.billingCountry!, formValues.billingState!)}
              showSearch
              filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
              fieldNames={{ value: 'name', label: 'name' }}
              disabled={!formValues.billingCountry || formValues.billingState === ''}
            />
          </Form.Item>
          <Form.Item name="postalCode" label="Zip Code:" className="w-full">
            <Input placeholder="Enter zip / postal code" />
          </Form.Item>
        </div>
      </>
    );
  }

  if (step === STEPS.CONTACT_INFO) {
    const phoneCode = Country.getCountryByCode(formValues.billingCountry!)?.phonecode;
    bodyContent = (
      <>
        <Form.Item
          className="w-full"
          name="billToEmail"
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
          name="phone"
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

  return (
    <Modal
      open={useAddPaymentMethod.isOpen}
      onCancel={useAddPaymentMethod.onClose}
      title={formTitle}
      footer={modalFooter}
      centered
    >
      {step === STEPS.CARD_DETAILS ? (
        <Form form={paymentTokenForm} layout="vertical" onValuesChange={onValuesChange} onFinish={() => {}}>
          {bodyContent}
        </Form>
      ) : (
        <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
          {bodyContent}
        </Form>
      )}
    </Modal>
  );
};

export default AddPaymentMethodModal;
