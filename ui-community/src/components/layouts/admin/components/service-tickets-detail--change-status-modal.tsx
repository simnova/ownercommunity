import { Button, Form, Input, Modal, Select } from 'antd';
import { AdminServiceTicketsDetailContainerMemberFieldsFragment, AdminServiceTicketsDetailContainerServiceTicketFieldsFragment,ServiceTicketAssignInput, ServiceTicketChangeStatusInput } from '../../../../generated';
import { useState } from 'react';
import { STATES } from './service-tickets-detail';

const { TextArea } = Input;

export interface ServiceTicketsDetailChangeStatusModalProps {
  data: {
    nextState: string;
    modalVisible: boolean;
    serviceTicket: AdminServiceTicketsDetailContainerServiceTicketFieldsFragment;
    members: AdminServiceTicketsDetailContainerMemberFieldsFragment[];
  };
  onChangeStatus: (changeStatusInput: ServiceTicketChangeStatusInput) => Promise<void>;
  onAssign: (assignInput: ServiceTicketAssignInput) => void;
  stateMap: Map<string, { state: string; description: string }>;
  closeModal: () => void;
}

export const ServiceTicketsDetailChangeStatusModal : React.FC<ServiceTicketsDetailChangeStatusModalProps> = (props) => {
  const [changeStatusForm] = Form.useForm<ServiceTicketChangeStatusInput & ServiceTicketAssignInput >();
  const [changeStatusFormLoading, setChangeStatusFormLoading] = useState<boolean>(false);


  return(
    <Modal
      title="Change Status"
      open={props.data.modalVisible}
      onCancel={() => {
        props.closeModal();
      }}
      onOk={() => {
        props.closeModal();
      }}
      footer={null}
    >
      <Form
        form={changeStatusForm}
        layout="vertical"
        onFinish={async (values) => {
          setChangeStatusFormLoading(true);
          await props.onChangeStatus({
            serviceTicketId: props.data.serviceTicket.id,
            status: props.data.nextState,
            activityDescription: values.activityDescription
          });
          props.closeModal(); 
          changeStatusForm.resetFields();

          if (props.data.serviceTicket.status === STATES.SUBMITTED && props.data.nextState !== STATES.DRAFT) {
            props.onAssign({
              serviceTicketId: props.data.serviceTicket.id,
              assignedToId: values.assignedToId
            });
          }
          setChangeStatusFormLoading(false);
        }}
      >
        Current State: <b>{props.stateMap.get(props.data.serviceTicket.status)?.state}</b>
        <br />
        <br />
        New State: <b>{props.stateMap.get(props.data.nextState)?.state}</b>
        <br />
        <div>
          <br />
          {props.data.serviceTicket.status === STATES.SUBMITTED && props.data.nextState !== STATES.DRAFT && (
            <Form.Item name={["assignedTo", "id"]} label="Assigned To">
              <Select
                allowClear={true}
                placeholder="Select a Member"
                options={props.data.members}
                fieldNames={{ label: "memberName", value: "id" }}
              />
            </Form.Item>
          )}
        </div>
        <Form.Item name={["activityDescription"]} label="Activity Description">
          <TextArea rows={4} placeholder="Reason for status change." maxLength={2000} />
        </Form.Item>
        <div className={"text-right"}>
          <Button onClick={() => props.closeModal()}>Cancel</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="primary" htmlType="submit" value={"save"} loading={changeStatusFormLoading}>
            Change Status
          </Button>
        </div>
      </Form>
    </Modal>
  );
}