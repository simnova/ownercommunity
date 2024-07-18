import React, { useEffect, useMemo, useState } from 'react';

import { Button, Card, DatePicker, Form, Input, Modal, Select } from 'antd';

import { Country, State, City } from 'country-state-city';

import useAddPaymentMethodModal from '../../../../hooks/useAddPaymentMethodModal';
import dayjs from 'dayjs';

enum STEPS {
  CARD_DETAILS = 0,
  BILLING_ADDRESS = 1,
  CONTACT_INFO = 2,
  REVIEW = 3
}

interface CustomerInfoFormSchema {
  cardNumber?: string;
  securityCode?: string;
  expirationMonthPicker?: string;
  billToForename?: string;
  billToLastName?: string;
  billToEmail?: string;
  billToAddressLine1?: string;
  billToAddressCountry?: string;
  billToAddressState?: string;
  billToAddressCity?: string;
}

interface AddPaymentMethodProps {}

const AddPaymentMethodModal: React.FC<AddPaymentMethodProps> = ({}) => {
  const [step, setStep] = useState(STEPS.CARD_DETAILS);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const initialFormState = {
    cardNumber: undefined,
    billToFirstName: undefined,
    billToLastName: undefined,
    billToEmail: undefined,
    billToAddressLine1: undefined,
    billToAddressCountry: undefined,
    billToAddressState: undefined,
    billToAddressCity: undefined
  };

  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<CustomerInfoFormSchema>(initialFormState);
  const formTitle = 'Add Payment Method';
  const onValuesChange = (changedValue: any) => {
    setFormValues({ ...formValues, ...changedValue });
  };
  const requiredFields = useMemo(() => {
    switch (step) {
      case STEPS.CARD_DETAILS:
        return ['cardNumber', 'expirationMonthPicker', 'securityCode'];
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

  const useAddPaymentMethod = useAddPaymentMethodModal();

  const action = useMemo(() => {
    let actionLabel = 'Next';

    if (step === STEPS.REVIEW) {
      actionLabel = 'Add Payment Method';
    }

    return (
      <Button type="primary" onClick={() => setStep((value) => value + 1)} disabled={isNextDisabled}>
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
        await form.validateFields(requiredFields, { validateOnly: true });
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
      <Form.Item
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
        <Form.Item
          label={'Card Expiration Date:'}
          required={true}
          name="expirationMonthPicker"
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

        <Form.Item
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
          name="billToForename"
          className="w-full"
          label="First Name:"
          rules={[{ required: true, message: 'Please enter your first name.' }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>
        <Form.Item name="billToSurname" className="w-full" label="Last Name:" required>
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
              options={State.getStatesOfCountry(formValues.billToAddressCountry)}
              showSearch
              filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
              fieldNames={{ value: 'isoCode', label: 'name' }}
              disabled={!formValues.billToAddressCountry}
            />
          </Form.Item>
          <Form.Item name="billToAddressCity" label="City:" className="w-full" required>
            <Select
              placeholder="Select city"
              options={City.getCitiesOfState(formValues.billToAddressCountry!, formValues.billToAddressState!)}
              showSearch
              filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
              fieldNames={{ value: 'name', label: 'name' }}
              disabled={!formValues.billToAddressCountry || formValues.billToAddressState === ''}
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
    const phoneCode = Country.getCountryByCode(formValues.billToAddressCountry!)?.phonecode;
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

  return (
    <Modal
      open={useAddPaymentMethod.isOpen}
      onCancel={useAddPaymentMethod.onClose}
      title={formTitle}
      footer={(_) => (
        <div className="flex items-center justify-end gap-2">
          {secondaryAction}
          {action}
        </div>
      )}
    >
      <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
        {bodyContent}
      </Form>
    </Modal>
  );
};

export default AddPaymentMethodModal;
