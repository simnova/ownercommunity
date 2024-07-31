import { Button, Checkbox, DatePicker, Divider, Form, Input, Modal, Select } from 'antd';

import useEditPaymentMethodModal from '../../../../hooks/useEditPaymentMethodModal';
import dayjs from 'dayjs';
import { City, Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

interface EditPaymentMethodModalProps {}

export const EditPaymentMethodModal: React.FC<EditPaymentMethodModalProps> = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [initialValues, setInitialValues] = useState<any>({});

  const { isOpen, onClose, paymentInstrument } = useEditPaymentMethodModal();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const title = 'Edit Payment Method';

  useEffect(() => {
    const newValues = {
      cardNumber: paymentInstrument?.cardNumber,
      expiration: dayjs(`${paymentInstrument?.expirationMonth}-${paymentInstrument?.expirationYear}`, 'MM-YYYY'),
      isDefault: paymentInstrument?.isDefault
    };
    setInitialValues(newValues);
    form.setFieldsValue(newValues);
  }, [paymentInstrument]);

  const cardInformation = (
    <>
      <div className="flex gap-6">
        <Form.Item
          // className="ant-form-item-control-input-content"
          label="Card Number:"
          name="cardNumber"
          rules={[{ required: true, message: 'Please provide the card number.' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={'Card Expiration Date:'}
          required={true}
          name="expiration"
          rules={[{ required: true, message: 'Please enter the expiration date as shown on the card.' }]}
        >
          <DatePicker.MonthPicker
            id="expirationMonthPicker"
            name="expirationMonthPicker"
            placeholder="Month"
            format="MM-YYYY"
            disabledDate={(current: any) => {
              return current && current < dayjs().endOf('day').subtract(1, 'day');
            }}
          ></DatePicker.MonthPicker>
        </Form.Item>
      </div>
      <Form.Item name="isDefault" valuePropName="checked">
        <Checkbox disabled={!!paymentInstrument?.isDefault}>Deafult payment method</Checkbox>
      </Form.Item>
    </>
  );

  const billingInformation = (
    <>
      <div className="flex gap-6">
        <Form.Item name="billingFirstName" className="w-full" label="First Name:" rules={[{ required: true }]}>
          <Input placeholder="Enter first name" />
        </Form.Item>
        <Form.Item name="billingLastName" className="w-full" label="Last Name:" rules={[{ required: true }]}>
          <Input placeholder="Enter last name" />
        </Form.Item>
      </div>
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

  return (
    <Modal title={title} open={isOpen} onCancel={onClose} centered footer={null}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => {
          setIsSaving(true);
          console.log(values);
          setIsSaving(false);
        }}
      >
        <h3>Card Information</h3>
        {cardInformation}
        <Divider />
        <h3>Billing Information</h3>
        {billingInformation}
        <div className="flex gap-2 justify-end">
          <Button type="primary" htmlType="submit" loading={isSaving}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
