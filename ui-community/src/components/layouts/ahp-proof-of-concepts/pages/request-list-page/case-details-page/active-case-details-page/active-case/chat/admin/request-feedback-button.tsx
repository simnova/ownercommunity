import { FilePdfOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Modal, Popconfirm } from 'antd';
import { FC, useState } from 'react';

interface RequestFeedbackButtonProps {
  updateEmbedding: (requests: any) => void;
}

export const RequestFeedbackButton: FC<RequestFeedbackButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
    if (request.updateAssignment === false && request.updateProperty === false && request.updateStatus === false) {
      setShowAlert(true);
      return;
    }
    setIsOpen(false);
    setShowAlert(false);
    props.updateEmbedding(request);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onCheck = (e: any) => {
    setShowAlert(false);
    const { value, checked } = e.target;
    setRequest((prevRequest: any) => ({
      ...prevRequest,
      [value]: checked
    }));
  };

  const footerButton = (
    <Popconfirm
      title="Are you sure?"
      description="Are you sure you want to request a document update for these changes?"
      onConfirm={closeModal}
    >
      <Button type="primary">
        Create Request
      </Button>
    </Popconfirm>
  );

  return (
    <>
      <Modal title="Request Update" open={isOpen} onCancel={onCancel} footer={footerButton}>
        {showAlert && <Alert message="Please select at least one option" type="error" />}
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
