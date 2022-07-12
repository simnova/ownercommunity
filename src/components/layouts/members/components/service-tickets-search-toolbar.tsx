import React from 'react';
import { Select, Button, Typography } from 'antd';
const { Option } = Select;
const { Text } = Typography;

export const ServiceTicketsSearchToolbar: React.FC<any> = (props) => {

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', paddingLeft: '16px' }}>
        <Select defaultValue={""} style={{ width: '175px' }}>
          <Option value="">View Name</Option>
        </Select>
        <Button type="primary">Save</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%', marginTop: '9px', paddingLeft: '16px' }}>
        <Text style={{ fontWeight: '600', alignSelf: 'center'}}>Columns to display: </Text>
        <Select defaultValue={""} style={{ width: '175px' }}>
          <Option value="">Select</Option>
        </Select>
      </div>
    </>
  )

}