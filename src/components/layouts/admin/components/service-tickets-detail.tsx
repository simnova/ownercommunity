import React from 'react';
import { Form,Input,Button,Descriptions, Select, Steps, Table } from 'antd';
import dayjs from 'dayjs';
import { ServiceTicket, ServiceTicketUpdateInput } from '../../../../generated';

const { TextArea } = Input;
const { Step } = Steps;

export interface ServiceTicketsDetailProps {
  data: {
    serviceTicket: ServiceTicket;
    members: any[];
    properties: any[];
  },
  onUpdate: (serviceTicket: ServiceTicketUpdateInput) => void;
}

export const ServiceTicketsDetail: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const stepArray = ['DRAFT','SUBMITTED','ASSIGNED','INPROGRESS','COMPLETED','CLOSED'];
  const currentStep = stepArray.findIndex((value) => value === props.data.serviceTicket.status) ;
  

  const columns = [

    {
      title: "Activity",
      dataIndex: "activityType",
      key: "activityType",
    },
    {
      title: "Activity By",
      dataIndex: ["activityBy", "memberName"],  
      key: "activityBy",
    },
    {
      title: "Description",
      dataIndex: ["activityDescription"],  
      key: "activityDescription",
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    },
  ]

  return (
    <div>
      <Steps current={currentStep} size="small">
      <Step title="Created" description="Created" />
        <Step title="Draft" description="Editing Details" />
        <Step title="Submitted" description="Awaiting Triage and Assignment" />
        <Step title="Assigned" description="Work will be scheduled" />
        <Step title="In Progress" description="Work is happening" />
        <Step title="Completed" description="Work is complete verification may be required" />
        <Step title="Closed" description="Work has been completed" />
      </Steps>
      <Descriptions title="ServiceTicket Info" size={'small'} layout={'vertical'}>
        <Descriptions.Item label="Id">{props.data.serviceTicket.id}</Descriptions.Item>
        <Descriptions.Item label="Status">{props.data.serviceTicket.status}</Descriptions.Item>
        <Descriptions.Item label="Created At">{dayjs(props.data.serviceTicket.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{dayjs(props.data.serviceTicket.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
      </Descriptions>
      <Form
        layout="vertical"
        form={form}
        initialValues={props.data.serviceTicket}
        onFinish={(values) => {
          console.log('values', values);
          props.onUpdate({
            serviceTicketId: props.data.serviceTicket.id,
            propertyId: values.property.id,
            title: values.title,
            description: values.description,
            priority: values.priority,
          });
          
        }}
        >
        <Form.Item
          name={["title"]}
          label="Title"
          rules={[
            { required: true, message: 'Title is required.' },
          ]}
        >
          <Input placeholder='Short title of the request' maxLength={200}  />
        </Form.Item>

        <Form.Item
          name={["description"]}
          label="Description"
          rules={[
            { required: true, message: 'Description is required.' },
          ]}
        >
          <TextArea placeholder='Description of the request' maxLength={2000}  />
        </Form.Item>

        <Form.Item
          name={['property','id']}
          label="Property"
        >
          <Select allowClear={true}  placeholder="Select a Property" options={props.data.properties} fieldNames={{label:'propertyName', value:'id'}} />
        </Form.Item>

        <Form.Item
          name={['priority']}
          label="Priority"         
          rules={[
            { required: true, message: 'Priority is required.' },
          ]}
        >
          <Select allowClear={false}  placeholder="Select a Priority">
            <Select.Option value={1}>1-Critical</Select.Option>
            <Select.Option value={2}>2-High</Select.Option>
            <Select.Option value={3}>3-Normal</Select.Option>
            <Select.Option value={4}>4-Low</Select.Option>
            <Select.Option value={5}>5-No Rush</Select.Option>
          </Select>
        </Form.Item>


        <Button type="primary" htmlType="submit" value={'save'} disabled={props.data.isDefault}>
          Save
        </Button>
      </Form>

      <Table 
        columns={columns} 
        dataSource={props.data.serviceTicket.activityLog}
        rowKey={(record: any) => record.id}
      />
    </div>
  )
}