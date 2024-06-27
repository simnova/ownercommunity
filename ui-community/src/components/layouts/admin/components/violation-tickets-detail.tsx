import {
  DownOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Descriptions,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Select,
  Space,
  Steps,
  Table,
  Typography
} from 'antd';
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
}

export const ViolationTicketsDetail: React.FC<any> = (props) => {
  const [changeStatusForm] = Form.useForm();
  const [changeStatusFormLoading, setChangeStatusFormLoading] = useState(false);

  const [assignForm] = Form.useForm();
  const [assignFormLoading, setAssignFormLoading] = useState(false);

  const [editDraftForm] = Form.useForm();
  const [editDraftFormLoading, setEditDraftFormLoading] = useState(false);

  const [addUpdateActivityForm] = Form.useForm();
  const [addUpdateActivityFormLoading, setAddUpdateActivityFormLoading] = useState(false);

  const stepArray = ['CREATED', 'DRAFT', 'SUBMITTED', 'ASSIGNED', 'INPROGRESS', 'COMPLETED', 'CLOSED'];
  const currentStep = stepArray.findIndex((value) => value === props.data.violationTicket.status);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextState, setNextState] = useState('');

  const assignStages = ['SUBMITTED', 'INPROGRESS', 'ASSIGNED'];

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
      key: 'activityDescription'
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

  const validStatusTransitions = new Map<string, string[]>([
    ['DRAFT', ['SUBMITTED']],
    ['SUBMITTED', ['DRAFT', 'ASSIGNED']],
    ['ASSIGNED', ['SUBMITTED', 'INPROGRESS']],
    ['INPROGRESS', ['ASSIGNED', 'COMPLETED']],
    ['COMPLETED', ['INPROGRESS', 'CLOSED']],
    ['CLOSED', ['INPROGRESS']]
  ]);

  const menuMap = new Map<string, any[]>([
    [
      'DRAFT',
      [
        <Menu.Item key="DRAFT" icon={<FileOutlined />}>
          Draft
        </Menu.Item>
      ]
    ],
    [
      'SUBMITTED',
      [
        <Menu.Item key="SUBMITTED" icon={<FileTextOutlined />}>
          Submitted
        </Menu.Item>
      ]
    ],
    [
      'ASSIGNED',
      [
        <Menu.Item key="ASSIGNED" icon={<SolutionOutlined />}>
          Assigned
        </Menu.Item>
      ]
    ],
    [
      'INPROGRESS',
      [
        <Menu.Item key="INPROGRESS" icon={<FileSyncOutlined />}>
          In Progress
        </Menu.Item>
      ]
    ],
    [
      'COMPLETED',
      [
        <Menu.Item key="COMPLETED" icon={<FileDoneOutlined />}>
          Completed
        </Menu.Item>
      ]
    ],
    [
      'CLOSED',
      [
        <Menu.Item key="CLOSED" icon={<FileProtectOutlined />}>
          Closed
        </Menu.Item>
      ]
    ]
  ]);

  const stateMap = new Map<string, { state: string; description: string }>([
    ['CREATED', { state: 'Created', description: 'Created' }],
    ['DRAFT', { state: 'Draft', description: 'Editing Details' }],
    ['SUBMITTED', { state: 'Submitted', description: 'Awaiting Triage and Assignment' }],
    ['ASSIGNED', { state: 'Assigned', description: 'Work will be scheduled' }],
    ['INPROGRESS', { state: 'In Progress', description: 'Work is happening' }],
    ['COMPLETED', { state: 'Completed', description: 'Work is complete, verification may be required' }],
    ['CLOSED', { state: 'Closed', description: 'Work has been completed' }]
  ]);

  const menuItems = validStatusTransitions.get(props.data.violationTicket.status)?.map((value: string) => {
    return menuMap.get(value)?.map((x: any) => x);
  });

  const changeStatus = (state: string) => {
    setNextState(state);
    setModalVisible(true);
  };

  const menu = (
    <Menu
      onClick={(value) => {
        console.log('Current status: ', props.data.violationTicket.status);
        changeStatus(value.key);
      }}
    >
      {menuItems}
    </Menu>
  );

  return (
    <div>
      <div style={{ margin: '0', padding: 24, backgroundColor: 'white' }}>
        <div style={{ marginBottom: '20px' }}>
          <div className="inline-block">
            <Title level={3}>Ticket Progress</Title>
          </div>
          <div className="float-right">
            <Dropdown overlay={menu}>
              <Button type={'primary'}>
                Change Status .. <DownOutlined />
              </Button>
            </Dropdown>
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
              console.log('values', values);
              await props.onChangeStatus({
                violationTicketId: props.data.violationTicket.id,
                status: nextState,
                activityDescription: values.activityDescription
              });
              setModalVisible(false);
              changeStatusForm.resetFields();

              if (props.data.violationTicket.status === 'SUBMITTED' && nextState !== 'DRAFT') {
                console.log('values', values);
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

              {props.data.violationTicket.status === 'SUBMITTED' && nextState !== 'DRAFT' && (
                <Form.Item name={['assignedTo', 'id']} label="Assigned To">
                  <Select
                    allowClear={true}
                    placeholder="Select a Member"
                    options={props.data.members}
                    fieldNames={{ label: 'memberName', value: 'id' }}
                  />
                </Form.Item>
              )}
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
          <Step title="Submitted" description="Awaiting Triage and Assignment" />
          <Step title="Assigned" description="Work will be scheduled" />
          <Step title="In Progress" description="Work is happening" />
          <Step title="Completed" description="Work is complete verification may be required" />
          <Step
            title="Closed"
            description="Work has been completed"
            status={props.data.violationTicket.status === 'CLOSED' ? 'finish' : 'wait'}
          />
        </Steps>
      </div>
      <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
        <Descriptions title="ServiceTicket Info" size={'small'} layout={'vertical'} labelStyle={{ fontSize: '10px' }}>
          <Descriptions.Item label="Id">{props.data.violationTicket.id}</Descriptions.Item>
          <Descriptions.Item label="Status">{stateMap.get(props.data.violationTicket.status)?.state}</Descriptions.Item>
          <Descriptions.Item label="Assigned To">
            {props.data.violationTicket.assignedTo ? props.data.violationTicket.assignedTo.memberName : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(props.data.violationTicket.createdAt).format('MM/DD/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {dayjs(props.data.violationTicket.createdAt).format('MM/DD/YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{ padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
        <Button type="primary" danger onClick={props.onDelete}>
          Delete Ticket
        </Button>
      </div>
      {assignStages.includes(props.data.violationTicket.status) && (
        <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
          <Title level={5}>Ticket Assignment</Title>
          <br />
          <Form
            layout="vertical"
            form={assignForm}
            initialValues={props.data.violationTicket}
            onFinish={(values) => {
              setAssignFormLoading(true);
              console.log('values', values);
              props.onAssign({
                violationTicketId: props.data.violationTicket.id,
                assignedToId: values.assignedTo.id
              });
              setAssignFormLoading(false);
            }}
          >
            <Form.Item name={['assignedTo', 'id']} label="Assigned To">
              <Select
                allowClear={true}
                placeholder="Select a Member"
                options={props.data.members}
                fieldNames={{ label: 'memberName', value: 'id' }}
                style={{ width: '35%' }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" value={'save'} loading={assignFormLoading}>
              Save Assignment
            </Button>
          </Form>
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
              ...props.data.violationTicket,
              penaltyPaidDate: props.data.violationTicket.penaltyPaidDate
                ? dayjs(props.data.violationTicket.penaltyPaidDate)
                : undefined
            }}
            onFinish={async (values) => {
              setEditDraftFormLoading(true);
              console.log('values', values);
              await props.onUpdate({
                violationTicketId: props.data.violationTicket.id,
                propertyId: values.property.id,
                title: values.title,
                description: values.description,
                priority: values.priority,
                penaltyAmount: values.penaltyAmount,
                penaltyPaidDate: values.penaltyPaidDate ? dayjs(values.penaltyPaidDate).toISOString() : undefined
              });
              setEditDraftFormLoading(false);
            }}
          >
            <Form.Item name={['title']} label="Title" rules={[{ required: true, message: 'Title is required.' }]}>
              <Input placeholder="Short title of the request" maxLength={200} />
            </Form.Item>

            <Form.Item
              name={['description']}
              label="Description"
              rules={[{ required: true, message: 'Description is required.' }]}
            >
              <TextArea placeholder="Description of the request" maxLength={2000} />
            </Form.Item>

            <Form.Item name={['property', 'id']} label="Property">
              <Select
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
              <Select allowClear={false} placeholder="Select a Priority">
                <Select.Option value={1}>1-Critical</Select.Option>
                <Select.Option value={2}>2-High</Select.Option>
                <Select.Option value={3}>3-Normal</Select.Option>
                <Select.Option value={4}>4-Low</Select.Option>
                <Select.Option value={5}>5-No Rush</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex gap-2">
              <Form.Item
                name={['penaltyAmount']}
                label="Penalty Amount"
                rules={[{ required: true, message: 'Penalty amount is required for Violation Ticket.' }]}
              >
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                  className="w-fit"
                />
              </Form.Item>
              <Form.Item name={['penaltyPaidDate']} label="Penalty Paid Date">
                <DatePicker format={'YYYY-MM-DD'} />
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
            console.log('values', values);
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
