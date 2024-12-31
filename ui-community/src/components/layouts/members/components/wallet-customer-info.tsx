import { Button, Divider, Form, Input, Select } from 'antd';
import { Country, State, City } from 'country-state-city';

interface CustomerInfoFormSchema {
  billToForename: string;
  billToSurname: string;
  billToEmail: string;
  billToAddressLine1: string;
  billToAddressCountry: string;
  billToAddressState: string;
  billToAddressCity: string;
}

interface WalletCustomerInfoProps {}

export const WalletCustomerInfo: React.FC<WalletCustomerInfoProps> = () => {
  const [customerInfoForm] = Form.useForm<CustomerInfoFormSchema>();

  return (
    <div className="flex flex-col space-y-4">
      <h1>Customer Information</h1>

      <Form form={customerInfoForm} onFinish={async () => {}}>
        <h3>General Information</h3>
        <Form.Item name="billToForename" label="First Name" required>
          <Input />
        </Form.Item>
        <Form.Item name="billToSurname" label="Last Name" required>
          <Input />
        </Form.Item>
        <Form.Item
          name="billToEmail"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Divider />

        <h3>Address</h3>
        <Form.Item name="billToAddressLine1" label="Street Address" required>
          <Input />
        </Form.Item>
        <div className="flex gap-4">
          <Form.Item name="billToAddressCountry" label="Country" className="w-full" required>
            <Select
              options={[Country.getCountryByCode('US')!]}
              fieldNames={{ value: 'name', label: 'name' }}
              defaultValue={'United States'}
            />
          </Form.Item>
          <Form.Item name="billToAddressState" label="State" className="w-full" required>
            <Select options={State.getStatesOfCountry('US')} fieldNames={{ value: 'name', label: 'name' }} />
          </Form.Item>
          <Form.Item name="billToAddressCity" label="City" className="w-full" required>
            <Select options={City.getCitiesOfCountry('US')} fieldNames={{ value: 'name', label: 'name' }} />
          </Form.Item>
        </div>

        <div className="flex justify-end w-full mt-4">
          <Button type="primary" htmlType="submit" value={'save'}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

