### Path Pattern:
ui-*/**/*.tsx

### Rules:

- The exported react component name should match the container name (the file name should be kabob-cased, and the component name should be PascalCased) unless the file name is index.tsx, then the component name should match the parent folder name.
- The component should be a functional component.
- An interface should be defined for the component's props, named \<ComponentName>Props.    
  - the props should refer to data only by the fragment name or graphql input type name
- Any use of the AntDesign Table should leverage TableColumnsType and must specify the type of the data (usually the fragment type)
- Any use of the AntDesign useForm hook must specify the type of the form data (usually the GraphQL input type)
- If any of the above rules are broken, direct the developer to refer to the document file named 002-ui-tsx-files.md

### Proper examples:

* https://github.com/simnova/ownercommunity/blob/main/ui-community/src/components/layouts/admin/components/members-accounts-add.tsx
* https://github.com/simnova/ownercommunity/blob/main/ui-community/src/components/layouts/admin/components/members-accounts-list.tsx



### Rough examples below:



### List Example:
```tsx

import React from 'react';
import { Table, TableColumnsType } from 'antd';
import { AdminContactsListContainerContactFieldsFragment } from from '../../../../generated';


export interface ContactListProps {
  data: AdminContactsListContainerContactFieldsFragment[];
}

export const ContactsList: React.FC<ContactListProps> = ({ data }) => {
  const columns: TableColumnsType<AdminContactsListContainerContactFieldsFragment> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address Line 1',
      dataIndex: '[address][addressLine1]',
      key: 'address1',
    },
    {
      title: 'Address Line 2',
      dataIndex: '[address][addressLine1]',
      key: 'address1',
    },
    {
      title: 'City',
      dataIndex: '[address][city]',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: '[address][state]',
      key: 'state',
    },
    {
      title: 'Zip',
      dataIndex: '[address][zip]',
      key: 'zip',
    },
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
};

```

### For Example:
```tsx  
import React from 'react';
import { Button, Form, Input } from 'antd';
import { ContactCreateInput } from '../../../../generated';

export interface ContactsCreateProps {
  onSave: (values: ContactsCreateInput) => void;
}

export const ContactsCreate: React.FC<ContactsCreateProps> = (props) =>  {
    const [form] = Form.useForm<ContactCreateInput>();
    const [formLoading, setFormLoading] = React.useState(false);

    
    const handleFinish = (values: ContactCreateInput) => {
        setFormLoading(true);
        props.onSave(values);
        setFormLoading(false);
    };
    
    return (
        <Form form={form} onFinish={handleFinish}>
        <Form.Item name="name" label="Name">
            <Input />
        </Form.Item>
        <Form.Item name="age" label="Age">
            <Input />
        </Form.Item>
        <Form.Item name={["address"]["addressLine1"]}label="Address Line 1">
            <Input />
        </Form.Item>
        <Form.Item name={["address"]["addressLine2"]}label="Address Line 2">
            <Input /> 
        </Form.Item>
        <Form.Item name={["address"]["city"]}label="City">
            <Input />
        </Form.Item>
        <Form.Item name={["address"]["state"]}label="State">
            <Input /> 
        </Form.Item>
        <Form.Item name={["address"]["zip"]}label="Zip">
            <Input />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" loading={formLoading}>
            Save
            </Button>
        </Form.Item>
        </Form>
    );
    };
    
    ```

}
