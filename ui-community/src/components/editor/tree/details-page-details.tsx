import React from 'react';

import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const ComponentPropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  saveData: PropTypes.func.isRequired,
}

interface ComponentPropInterface {
  data: {  
    id: string;
    title: string;
  },

  saveData: (data: {
    id: string,
    title: string,
  }) => void;
}

export type PageDetailsPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const DetailsPageDetails: React.FC<PageDetailsPropTypes> = (props) => {

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      title: props.data.title,
    });
  }, [props.data]);

  return <Form
    form={form}
    initialValues={{
      title: props.data.title,
    }}
    onFinish={(values) => {
      props.saveData(values);
    }}
  >
    <Form.Item
      name="title"
      label="Title"
      rules={[
        {required: true, message: 'Please input the title of the page'},
      ]}
    >
      <Input/>
    </Form.Item>
    <Button type="primary" htmlType="submit" value={'save'}>
      Save Page Changes
    </Button>
  </Form>
}


