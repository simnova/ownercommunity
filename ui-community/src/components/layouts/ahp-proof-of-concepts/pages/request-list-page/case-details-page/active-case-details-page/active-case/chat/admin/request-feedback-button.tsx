import { FilePdfOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal } from 'antd';
import { FC, useState } from 'react';

interface RequestFeedbackButtonProps {
  updateEmbedding: (requests: any) => void;
}

export const RequestFeedbackButton: FC<RequestFeedbackButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<any>({
    value: 'documentRequestType',
    message: 'Request Document Update',
    updateAssignment: false,
    updateProperty: false,
    updateStatus: false,
    icon: <FilePdfOutlined />
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    props.updateEmbedding(request);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onCheck = (e: any) => {
    const { value, checked } = e.target;
    setRequest((prevRequest: any) => ({
      ...prevRequest,
      [value]: checked
    }));
  };

  const footerButton = (
    <Button onClick={closeModal} type="primary">
      Create Request
    </Button>
  );

  return (
    <>
      <Modal title="Request Update" open={isOpen} onCancel={onCancel} footer={footerButton}>
        Request Applicant to:
        <br />
        <Checkbox value={'updateAssignment'} onChange={onCheck} checked={request.updateAssignment}>
          add/update assignment
        </Checkbox>
        <br />
        <Checkbox value={'updateProperty'} onChange={onCheck} checked={request.updateProperty}>
          add/update property
        </Checkbox>
        <br />
        <Checkbox value={'updateStatus'} onChange={onCheck} checked={request.updateStatus}>
          add/update status
        </Checkbox>
      </Modal>
      <Button
        style={{ width: '100%', borderRadius: '8px', marginRight: 10, marginBottom: 10, marginTop: 10 }}
        onClick={openModal}
      >
        <FilePdfOutlined /> Request Feedback
      </Button>
    </>
  );
};
