import { DownOutlined, FileOutlined, FileProtectOutlined, FileSyncOutlined, FileTextOutlined, SolutionOutlined } from '@ant-design/icons';
import { Button, Descriptions, Dropdown, Form, Input, InputNumber, Menu, Modal, Select, Skeleton, Space,Steps, Table,Tabs, TabsProps, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {  ViolationTicketAddUpdateActivityInput, ViolationTicketUpdateInput,ViolationTicketChangeStatusInput, AdminViolationTicketsDetailContainerMemberAssignableToTicketsQuery, Exact, AdminViolationTicketsDetailContainerViolationTicketFieldsFragment, ViolationTicketAssignInput, AdminViolationTicketsDetailContainerServiceTicketActivityDetailFieldsFragment } from '../../../../generated';

import { LazyQueryResultTuple } from '@apollo/client';
import { AdminChatMessagesContainer } from '../../ahp-proof-of-concepts/pages/request-list-page/case-details-page/active-case-details-page/active-case/chat/admin/admin-chat-messages.container';

const { Title } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

export interface ViolationTicketsDetailProps {
  data: {
    violationTicket: AdminViolationTicketsDetailContainerViolationTicketFieldsFragment;
    properties: any[];
  };
  onUpdate: (violationTicket: ViolationTicketUpdateInput) => void;
  onAssign: (assignInput: ViolationTicketAssignInput) => void;  
  onDelete: () => void;
  onChangeStatus: (changeStatusInput: ViolationTicketChangeStatusInput) => Promise<void>;
  onAddUpdateActivity: (values: ViolationTicketAddUpdateActivityInput) => Promise<void>;
  memberLazyQuery: LazyQueryResultTuple<
  AdminViolationTicketsDetailContainerMemberAssignableToTicketsQuery,
    Exact<{
      violationTicketId: any;
    }>
  >;
}

export const ViolationTicketsDetail: React.FC<ViolationTicketsDetailProps> = (props) => {
  const [changeStatusForm] = Form.useForm();
  const [changeStatusFormLoading, setChangeStatusFormLoading] = useState(false);

  const [assignForm] = Form.useForm();
  const [assignFormLoading, setAssignFormLoading] = useState(false);

  const [editDraftForm] = Form.useForm();
  const [editDraftFormLoading, setEditDraftFormLoading] = useState(false);

  const [addUpdateActivityForm] = Form.useForm();
  const [addUpdateActivityFormLoading, setAddUpdateActivityFormLoading] = useState(false);

  const stepArray = ['CREATED', 'DRAFT', 'SUBMITTED', 'ASSIGNED', 'PAID', 'CLOSED'];

  const currentStep = stepArray.findIndex((value) => value === props.data.violationTicket.status);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextState, setNextState] = useState('');

  const [membersData, { data: memberData, loading: memberLoading }] = props.memberLazyQuery;

  useEffect(() => {
    const fetchMembers = async () => {
      await membersData();
      assignForm.resetFields(['assignedTo', 'id']);
    };

    if (nextState === 'SUBMITTED') {
      fetchMembers();
    }
  }, [nextState]);

  const columns: ColumnsType<AdminViolationTicketsDetailContainerServiceTicketActivityDetailFieldsFragment> = [
    {
      title: 'Activity',
      dataIndex: 'activityType',
      key: 'activityType',
      render: (text: string) => {
        if (text === 'PAID') {
          return 'PAID';
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
            if (field === 'Priority') {
              newValue = priority.find((x) => x.value === parseInt(newValue))?.label ?? '';
              oldValue = priority.find((x) => x.value === parseInt(oldValue))?.label ?? '';
            }

            if (field === 'Penalty Amount') {
              newValue = `$ ${newValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              oldValue = `$ ${oldValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

            if (field === 'Penalty paid date') {
              if (dayjs(newValue).isValid()) {
                newValue = newValue === undefined ? '' : dayjs(newValue).format('DD-MMM-YYYY h:mm A');
              }

              if (dayjs(oldValue).isValid()) {
                oldValue = oldValue === undefined ? '' : dayjs(oldValue).format('DD-MMM-YYYY h:mm A');
              }
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

  const validStatusTransitions = new Map<string, string[]>([
    ['DRAFT', ['SUBMITTED']],
    ['SUBMITTED', ['DRAFT', 'ASSIGNED']],
    ['ASSIGNED', ['SUBMITTED', 'PAID']],
    ['PAID', ['ASSIGNED', 'CLOSED']],
    ['CLOSED', ['ASSIGNED']]
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
      'PAID',
      [
        <Menu.Item key="PAID" icon={<FileSyncOutlined />}>
          Paid
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
    ['PAID', { state: 'Paid', description: 'Payment complete' }],
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
        changeStatus(value.key);
      }}
    >
      {menuItems}
    </Menu>
  );

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
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Details',
      children: (
        <div>
          <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
            <Descriptions
              title="ServiceTicket Info"
              size={'small'}
              layout={'vertical'}
              labelStyle={{ fontSize: '10px' }}
            >
              <Descriptions.Item label="Id">{props.data.violationTicket.id}</Descriptions.Item>
              <Descriptions.Item label="Title">{props.data.violationTicket.title}</Descriptions.Item>
              <Descriptions.Item label="Status">
                {stateMap.get(props.data.violationTicket.status)?.state}
              </Descriptions.Item>
              <Descriptions.Item label="Penalty Amount">
                {`$ ${props.data.violationTicket.financeDetails?.serviceFee}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
            </Descriptions>
          </div>
          <div style={{ padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
            <Button type="primary" danger onClick={props.onDelete}>
              Delete Ticket
            </Button>
          </div>
          {memberLoading ? (
            <div>
              <Skeleton active />
            </div>
          ) : (
            props.data.violationTicket.status === 'SUBMITTED' &&
            memberData?.memberAssignableToViolationTickets && (
              <div style={{ marginTop: 20, padding: 24, minHeight: '100%', backgroundColor: 'white' }}>
                <Title level={5}>Ticket Assignment</Title>
                <br />
                <Form
                  layout="vertical"
                  form={assignForm}
                  onFinish={async (values) => {
                    setAssignFormLoading(true);
                    await props.onAssign({
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
                      options={[memberData?.memberAssignableToViolationTickets]}
                      fieldNames={{ label: 'memberName', value: 'id' }}
                      style={{ width: '35%' }}
                      defaultValue={undefined}
                    />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" value={'save'} loading={assignFormLoading}>
                    Save Assignment
                  </Button>
                </Form>
              </div>
            )
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
                }}
                onFinish={async (values) => {
                  setEditDraftFormLoading(true);
                  await props.onUpdate({
                    violationTicketId: props.data.violationTicket.id,
                    propertyId: values.property.id,
                    title: values.title,
                    description: values.description,
                    priority: values.priority,
                    penaltyAmount: values.financeDetails.serviceFee,
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
                  <Select
                    allowClear={false}
                    placeholder="Select a Priority"
                    options={priority}
                    fieldNames={{ label: 'label', value: 'value' }}
                  />
                </Form.Item>
                <div className="flex gap-2">
                  <Form.Item
                    name={['financeDetails', 'serviceFee']}
                    label="Penalty Amount"
                    rules={[{ required: true, message: 'Penalty amount is required for Violation Ticket.' }]}
                  >
                    <InputNumber
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
              dataSource={props.data.violationTicket.activityLog as AdminViolationTicketsDetailContainerServiceTicketActivityDetailFieldsFragment[]}
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
      )
    },
    {
      key: '2',
      label: 'Chat',
      children: <AdminChatMessagesContainer ticketType='ViolationTicketType'/>
    }
  ];

  return (
    <>
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
            initialValues={{
              assignedTo: {
                id: memberData?.memberAssignableToViolationTickets?.id
              }
            }}
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
              {props.data.violationTicket.status === 'SUBMITTED' &&
                nextState !== 'DRAFT' &&
                memberData?.memberAssignableToViolationTickets && (
                  <Form.Item name={['assignedTo', 'id']} label="Assigned To">
                    <Select
                      allowClear={true}
                      placeholder="Select a Member"
                      options={[memberData?.memberAssignableToViolationTickets]}
                      fieldNames={{ label: 'memberName', value: 'id' }}
                    />
                  </Form.Item>
                )}
            </div>
            <Form.Item name={['activityDescription']} label="Activity Description" required>
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
          <Step title="Submitted" description="Awaiting assigment" />
          <Step title="Assigned" description="Awaiting payment" />
          <Step title="Paid" description="Payment complete" />
          <Step
            title="Closed"
            description="Work has been completed"
            status={props.data.violationTicket.status === 'CLOSED' ? 'finish' : 'wait'}
          />
        </Steps>
      </div>
      <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
    </>
  );
};
