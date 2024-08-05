import { Button, Descriptions, Form, Input, InputNumber, Modal, Select, Space, Steps, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
  ViolationTicket,
  ServiceTicketActivityDetail,
  ViolationTicketAddUpdateActivityInput,
  ViolationTicketUpdateInput,
  ViolationTicketChangeStatusInput
} from '../../../../generated';
import usePayModal from '../../../../hooks/usePayModal';
import { PaymentModalContainer } from './payment-modal.container';

const { Title } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

export interface ViolationTicketsDetailProps {
  data: {
    violationTicket: ViolationTicket;
    members: any[];
    properties: any[];
  };
  onUpdate: (violationTicket: ViolationTicketUpdateInput) => void;
  onChangeStatus: (changeStatusInput: ViolationTicketChangeStatusInput) => Promise<void>;
  onAddUpdateActivity: (values: ViolationTicketAddUpdateActivityInput) => Promise<void>;
  onPayment: (violationTicketId: string, paymentAmount: number, paymentInstrumentId: string) => Promise<void>;
}

export const ViolationTicketsDetail: React.FC<any> = (props) => {
  const [changeStatusForm] = Form.useForm();
  const [changeStatusFormLoading, setChangeStatusFormLoading] = useState(false);

  const [editDraftForm] = Form.useForm();
  const [editDraftFormLoading, setEditDraftFormLoading] = useState(false);

  const [addUpdateActivityForm] = Form.useForm();
  const [addUpdateActivityFormLoading, setAddUpdateActivityFormLoading] = useState(false);

  const stepArray = ['CREATED', 'DRAFT', 'SUBMITTED', 'ASSIGNED', 'PAID', 'CLOSED'];

  const currentStep = stepArray.findIndex((value) => value === props.data.violationTicket.status);
  const [modalVisible, setModalVisible] = useState(false);
  const nextState = stepArray[currentStep + 1];

  const usePay = usePayModal();

  const priority = [
    {
      label: '1-Critical',
      value: 1
    },
    {
      label: '2-High',
      value: 2
    },
    {
      label: '3-Normal',
      value: 3
    },
    {
      label: '4-Low',
      value: 4
    },
    {
      label: '5-No Rush',
      value: 5
    }
  ];

  const columns: ColumnsType<ServiceTicketActivityDetail> = [
    {
      title: 'Activity',
      dataIndex: 'activityType',
      key: 'activityType',
      render: (text: string) => {
        if (text === 'INPROGRESS') {
          return 'IN PROGRESS';
        }
        return text;
      }
    },
    {
      title: 'Activity By',
      dataIndex: ['activityBy', 'memberName'],
      key: 'activityBy'
    },
    {
      title: 'Description',
      dataIndex: ['activityDescription'],
      key: 'activityDescription',
      render: (text: string) => {
        let logs = text.split(' | ');
        return logs.map((log) => {
          const regex = /(?<field>[^:]+):\s*%n\s*(?<newValue>.*?)(?:\s*%o\s*(?<oldValue>.*))?$/;
          const match = log.match(regex);

          if (match && match.groups) {
            const field = match.groups?.field;
            let newValue = match.groups?.newValue?.trim();
            let oldValue = match.groups?.oldValue?.trim();
            console.log(newValue);
            if (field === 'Priority') {
              newValue = priority.find((x) => x.value === parseInt(newValue))?.label ?? '';
              oldValue = priority.find((x) => x.value === parseInt(oldValue))?.label ?? '';
            }

            if (field === 'Penalty Amount') {
              newValue = `$ ${newValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              oldValue = `$ ${oldValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

            if (field === 'Penalty paid date') {
              newValue = newValue === undefined ? '' : dayjs(newValue).format('DD-MMM-YYYY h:mm A');
              oldValue = oldValue === undefined ? '' : dayjs(oldValue).format('DD-MMM-YYYY h:mm A');
            }
            return (
              <div className="flex gap-1">
                <b>{field}:</b>
                <span>{newValue}</span>
                <span></span>
                <s>{oldValue}</s>
              </div>
            );
          }
          return <p>{log}</p>;
        });
      }
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'ascend',
      sorter: (a: any, b: any) => (new Date(a).getTime() > new Date(b).getTime() ? 1 : -1),
      render: (text: any) => <span>{dayjs(text).format('DD-MMM-YYYY h:mm A')}</span>
    }
  ];

  const stateMap = new Map<string, { state: string; description: string }>([
    ['CREATED', { state: 'Created', description: 'Created' }],
    ['DRAFT', { state: 'Draft', description: 'Editing Details' }],
    ['SUBMITTED', { state: 'Submitted', description: 'Awaiting Triage and Assignment' }],
    ['ASSIGNED', { state: 'Assigned', description: 'Work will be scheduled' }],
    ['PAID', { state: 'Paid', description: 'Payment complete' }],
    ['CLOSED', { state: 'Closed', description: 'Work has been completed' }]
  ]);

  const handlePayment = async (paymentInstrumentId: string) => {
    await props.onPayment(props.data.violationTicket.id, props.data.violationTicket.financeDetails.serviceFee, paymentInstrumentId);
  };

  return (
    <div>
      <div style={{ margin: '0', padding: 24, backgroundColor: 'white' }}>
        <div style={{ marginBottom: '20px' }}>
          <div className="inline-block">
            <Title level={3}>Ticket Progress</Title>
          </div>
        </div>
        <Modal
          title="Change Status"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
          }}
          onOk={() => {
            setModalVisible(false);
          }}
          footer={null}
        >
          <Form
            form={changeStatusForm}
            layout="vertical"
            onFinish={async (values) => {
              setChangeStatusFormLoading(true);
              await props.onChangeStatus({
                violationTicketId: props.data.violationTicket.id,
                status: nextState,
                activityDescription: values.activityDescription
              });
              setModalVisible(false);
              changeStatusForm.resetFields();

              if (props.data.violationTicket.status === 'SUBMITTED' && nextState !== 'DRAFT') {
                props.onAssign({
                  violationTicketId: props.data.violationTicket.id,
                  assignedToId: values.assignedTo.id
                });
              }
              setChangeStatusFormLoading(false);
            }}
          >
            Current State: <b>{stateMap.get(props.data.violationTicket.status)?.state}</b>
            <br />
            <br />
            New State: <b>{stateMap.get(nextState)?.state}</b>
            <br />
            <div>
              <br />
            </div>
            <Form.Item name={['activityDescription']} label="Activity Description">
              <TextArea rows={4} placeholder="Reason for status change." maxLength={2000} />
            </Form.Item>
            <div className={'text-right'}>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary" htmlType="submit" value={'save'} loading={changeStatusFormLoading}>
                Change Status
              </Button>
            </div>
          </Form>
        </Modal>
        <Steps current={currentStep} size="small">
          <Step title="Created" description="Created" />
          <Step title="Draft" description="Editing Details" />
          <Step title="Submitted" description="Awaiting assignment" />
          <Step title="Assigned" description="Awaiting payment" />
          <Step title="Paid" description="Payment complete" />
          <Step
            title="Closed"
            description="Payment has been completed"
            status={props.data.violationTicket.status === 'CLOSED' ? 'finish' : 'wait'}
          />
        </Steps>
      </div>
      <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
        <Descriptions title="ViolationTicket Info" size={'small'} layout={'vertical'} labelStyle={{ fontSize: '10px' }}>
          <Descriptions.Item label="Id">{props.data.violationTicket.id}</Descriptions.Item>
          <Descriptions.Item label="Title">{props.data.violationTicket.title}</Descriptions.Item>
          <Descriptions.Item label="Status">{stateMap.get(props.data.violationTicket.status)?.state}</Descriptions.Item>
          <Descriptions.Item label="Penalty Amount">
            {`$ ${props.data.violationTicket.financeDetails.serviceFee}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Descriptions.Item>
          <Descriptions.Item label="Assigned To">
            {props.data.violationTicket.assignedTo ? props.data.violationTicket.assignedTo.memberName : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(props.data.violationTicket.createdAt).format('MM/DD/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {dayjs(props.data.violationTicket.createdAt).format('MM/DD/YYYY')}
          </Descriptions.Item>
          {props.data.violationTicket.status === 'PAID' && props.data.violationTicket?.financeDetails?.transactions?.submission?.transactionReference && (
            <Descriptions.Item label="Payment Transaction ID">
              {props.data.violationTicket?.financeDetails?.transactions?.submission?.transactionReference?.referenceId}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
      {props.data.violationTicket.status === 'ASSIGNED' && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white', width: '50%' }}>
            <Title level={5}>Pay Penalty</Title>
            <br />
            <Button type="primary" onClick={usePay.onOpen}>
              Pay now
            </Button>
            <PaymentModalContainer title="Pay violation fee" onPayment={handlePayment} />
          </div>
        </div>
      )}
      {props.data.violationTicket.status === 'DRAFT' && (
        <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
          <Title level={5}>Edit Draft Ticket</Title>
          <br />
          <Form
            layout="vertical"
            form={editDraftForm}
            initialValues={{
              ...props.data.violationTicket
            }}
            onFinish={async (values) => {
              setEditDraftFormLoading(true);
              await props.onUpdate({
                violationTicketId: props.data.violationTicket.id,
                propertyId: values.property.id,
                title: values.title,
                description: values.description,
                priority: values.priority,
                penaltyAmount: values.financeDetails.penaltyAmount
              });
              setEditDraftFormLoading(false);
            }}
          >
            <Form.Item name={['title']} label="Title" rules={[{ required: true, message: 'Title is required.' }]}>
              <Input disabled placeholder="Short title of the request" maxLength={200} />
            </Form.Item>

            <Form.Item
              name={['description']}
              label="Description"
              rules={[{ required: true, message: 'Description is required.' }]}
            >
              <TextArea disabled placeholder="Description of the request" maxLength={2000} />
            </Form.Item>

            <Form.Item name={['property', 'id']} label="Property">
              <Select
                disabled
                allowClear={true}
                placeholder="Select a Property"
                options={props.data.properties}
                fieldNames={{ label: 'propertyName', value: 'id' }}
              />
            </Form.Item>

            <Form.Item
              name={['priority']}
              label="Priority"
              rules={[{ required: true, message: 'Priority is required.' }]}
            >
              <Select disabled allowClear={false} placeholder="Select a Priority">
                <Select.Option value={1}>1-Critical</Select.Option>
                <Select.Option value={2}>2-High</Select.Option>
                <Select.Option value={3}>3-Normal</Select.Option>
                <Select.Option value={4}>4-Low</Select.Option>
                <Select.Option value={5}>5-No Rush</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex gap-2">
              <Form.Item
                name={['financeDetails', 'serviceFee']}
                label="Penalty Amount"
                rules={[{ required: true, message: 'Penalty amount is required for Violation Ticket.' }]}
              >
                <InputNumber
                  disabled
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                  className="w-fit"
                />
              </Form.Item>
            </div>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                value={'save'}
                loading={editDraftFormLoading}
                disabled={editDraftFormLoading}
              >
                Save Draft
              </Button>
            </Space>
          </Form>
        </div>
      )}
      <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
        <Title level={5}>Activity Log</Title>
        <br />
        <Table
          columns={columns}
          dataSource={props.data.violationTicket.activityLog}
          rowKey={(record: any) => record.id}
        />
        <Form
          layout="vertical"
          form={addUpdateActivityForm}
          onFinish={async (values) => {
            setAddUpdateActivityFormLoading(true);
            await props.onAddUpdateActivity({
              violationTicketId: props.data.violationTicket.id,
              activityDescription: values.activityDescription
            });
            addUpdateActivityForm.resetFields();
            setAddUpdateActivityFormLoading(false);
          }}
        >
          <Form.Item name={['activityDescription']} label="Activity Description">
            <TextArea rows={4} placeholder="Add an update to the ticket." maxLength={2000} />
          </Form.Item>
          <Button type="primary" htmlType="submit" value={'save'} loading={addUpdateActivityFormLoading}>
            Add Activity Update
          </Button>
        </Form>
      </div>
    </div>
  );
};
