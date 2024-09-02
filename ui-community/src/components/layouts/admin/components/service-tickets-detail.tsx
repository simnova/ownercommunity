import { DownOutlined, FileDoneOutlined, FileOutlined, FileProtectOutlined, FileSyncOutlined, FileTextOutlined, SolutionOutlined } from "@ant-design/icons";
import { Button, Descriptions, Dropdown, Menu, Steps, Tabs, TabsProps, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  AdminServiceTicketsDetailContainerMemberFieldsFragment,
  AdminServiceTicketsDetailContainerPropertyFieldsFragment,
  AdminServiceTicketsDetailContainerServiceTicketFieldsFragment,
  ServiceTicketAddUpdateActivityInput,
  ServiceTicketAssignInput,
  ServiceTicketChangeStatusInput,
  ServiceTicketUpdateInput
} from "../../../../generated";
import { AdminChatMessagesContainer } from "../../ahp-proof-of-concepts/pages/request-list-page/case-details-page/active-case-details-page/active-case/chat/admin/admin-chat-messages.container";
const { Title } = Typography;
const { Step } = Steps;
import { ServiceTicketsDetailAssignmentForm } from "./service-tickets-detail--assignment-form";
import { ServiceTicketsDetailDraftForm } from "./service-tickets-detail--draft-form";
import { ServiceTicketsDetailActivityLog } from "./service-tickets-detail--activity-log";
import { ServiceTicketsDetailChangeStatusModal } from "./service-tickets-detail--change-status-modal";

export interface ServiceTicketsDetailProps {
  data: {
    serviceTicket: AdminServiceTicketsDetailContainerServiceTicketFieldsFragment;
    members: AdminServiceTicketsDetailContainerMemberFieldsFragment[];
    properties: AdminServiceTicketsDetailContainerPropertyFieldsFragment[];
  };
  onUpdate: (serviceTicket: ServiceTicketUpdateInput) => void;
  onAssign: (assignInput: ServiceTicketAssignInput) => void;
  onDelete: () => void;
  onChangeStatus: (changeStatusInput: ServiceTicketChangeStatusInput) => Promise<void>;
  onAddUpdateActivity: (values: ServiceTicketAddUpdateActivityInput) => Promise<void>;
}

export enum STATES {
  CREATED = "CREATED",
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  ASSIGNED = "ASSIGNED",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED"
}

export const ServiceTicketsDetail: React.FC<ServiceTicketsDetailProps> = (props) => {
  const stepArray = [STATES.CREATED,STATES.DRAFT,STATES.SUBMITTED,STATES.ASSIGNED,STATES.INPROGRESS,STATES.COMPLETED,STATES.CLOSED];
  const currentStep = stepArray.findIndex((value) => value === props.data.serviceTicket.status);
  const assignStages:string[] = [STATES.SUBMITTED, STATES.INPROGRESS, STATES.ASSIGNED];
  const [nextState, setNextState] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const validStatusTransitions = new Map<string, string[]>([
    [STATES.DRAFT, [STATES.SUBMITTED]],
    [STATES.SUBMITTED, [STATES.DRAFT, STATES.ASSIGNED]],
    [STATES.ASSIGNED, [STATES.SUBMITTED, STATES.INPROGRESS]],
    [STATES.INPROGRESS, [STATES.ASSIGNED, STATES.COMPLETED]],
    [STATES.COMPLETED, [STATES.INPROGRESS, STATES.CLOSED]],
    [STATES.CLOSED, [STATES.INPROGRESS]]
  ]);

  const menuMap = new Map<string, any[]>([
    [
      STATES.DRAFT,
      [
        <Menu.Item key={STATES.DRAFT} icon={<FileOutlined />}>
          Draft
        </Menu.Item>
      ]
    ],
    [
      STATES.SUBMITTED,
      [
        <Menu.Item key={STATES.SUBMITTED} icon={<FileTextOutlined />}>
          Submitted
        </Menu.Item>
      ]
    ],
    [
      STATES.ASSIGNED,
      [
        <Menu.Item key={STATES.ASSIGNED} icon={<SolutionOutlined />}>
          Assigned
        </Menu.Item>
      ]
    ],
    [
      STATES.INPROGRESS,
      [
        <Menu.Item key={STATES.INPROGRESS} icon={<FileSyncOutlined />}>
          In Progress
        </Menu.Item>
      ]
    ],
    [
      STATES.COMPLETED,
      [
        <Menu.Item key={STATES.COMPLETED} icon={<FileDoneOutlined />}>
          Completed
        </Menu.Item>
      ]
    ],
    [
      STATES.CLOSED,
      [
        <Menu.Item key={STATES.CLOSED} icon={<FileProtectOutlined />}>
          Closed
        </Menu.Item>
      ]
    ]
  ]);

  const stateMap = new Map<string, { state: string; description: string }>([
    [STATES.CREATED, { state: "Created", description: "Created" }],
    [STATES.DRAFT, { state: "Draft", description: "Editing Details" }],
    [STATES.SUBMITTED, { state: "Submitted", description: "Awaiting Triage and Assignment" }],
    [STATES.ASSIGNED, { state: "Assigned", description: "Work will be scheduled" }],
    [STATES.INPROGRESS, { state: "In Progress", description: "Work is happening" }],
    [STATES.COMPLETED, { state: "Completed", description: "Work is complete, verification may be required" }],
    [STATES.CLOSED, { state: "Closed", description: "Work has been completed" }]
  ]);

  const menuItems = validStatusTransitions.get(props.data.serviceTicket.status)?.map((value: string) => {
    return menuMap.get(value)?.map((x: any) => x);
  });

  const changeStatus = (state: string) => {
    setNextState(state);
    setModalVisible(true);
  };

  console.log(menuItems);
  const menu = (
    <Menu
      onClick={(value) => {
        console.log("Current status: ", props.data.serviceTicket.status);
        changeStatus(value.key);
      }}
    >
      {menuItems}
    </Menu>
  );


  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Details",
      children: (
        <>
          <div style={{ marginTop: 20, padding: 24, minHeight: "100%", backgroundColor: "white" }}>
            <Descriptions
              title="ServiceTicket Info"
              size={"small"}
              layout={"vertical"}
              labelStyle={{ fontSize: "10px" }}
            >
              <Descriptions.Item label="Id">{props.data.serviceTicket.id}</Descriptions.Item>
              <Descriptions.Item label="Status">
                {stateMap.get(props.data.serviceTicket.status)?.state}
              </Descriptions.Item>
              <Descriptions.Item label="Assigned To">
                {props.data.serviceTicket.assignedTo ? props.data.serviceTicket.assignedTo.memberName : ""}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {dayjs(props.data.serviceTicket.createdAt).format("MM/DD/YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                {dayjs(props.data.serviceTicket.createdAt).format("MM/DD/YYYY")}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div style={{ padding: 24, minHeight: "100%", backgroundColor: "white" }}>
            <Button type="primary" danger onClick={props.onDelete}>
              Delete Ticket
            </Button>
          </div>
          {assignStages.includes(props.data.serviceTicket.status) && (
            <ServiceTicketsDetailAssignmentForm data={props.data} onAssign={props.onAssign}
            />
          )}
          {props.data.serviceTicket.status === "DRAFT" && (
            <div style={{ marginTop: 20, padding: 24, minHeight: "100%", backgroundColor: "white" }}>
              <ServiceTicketsDetailDraftForm data={props.data} onUpdate={props.onUpdate} />
            </div>
          )}
          <div style={{ marginTop: 20, padding: 24, minHeight: "100%", backgroundColor: "white" }}>
            <ServiceTicketsDetailActivityLog data={props.data} onAddUpdateActivity={props.onAddUpdateActivity} />
          </div>
        </>
      )
    },
    {
      key: "2",
      label: "Chat",
      children: <AdminChatMessagesContainer ticketType="ServiceTicketType"/>
    }
  ];

  return (
    <>
      <div style={{ margin: "0", padding: 24, backgroundColor: "white" }}>
        <div style={{ marginBottom: "20px" }}>
          <div className="inline-block">
            <Title level={3}>Ticket Progress</Title>
          </div>
          <div className="float-right">
            <Dropdown overlay={menu}>
              <Button type={"primary"}>
                Change Status .. <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <ServiceTicketsDetailChangeStatusModal data={Object.assign(props.data, {nextState:nextState, modalVisible:modalVisible})} stateMap={stateMap} onChangeStatus={props.onChangeStatus} onAssign={props.onAssign} closeModal={() => setModalVisible(false)} />
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
            status={props.data.serviceTicket.status === "CLOSED" ? "finish" : "wait"}
          />
        </Steps>
      </div>

      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};
