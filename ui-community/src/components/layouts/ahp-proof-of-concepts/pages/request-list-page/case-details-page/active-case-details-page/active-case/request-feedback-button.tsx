import { FilePdfOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal } from 'antd';
import { FC, useState } from 'react';

interface RequestFeedbackButtonProps {}
export const RequestFeedbackButton: FC<RequestFeedbackButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal title="Request Update" open={isOpen} onCancel={closeModal} onOk={closeModal}>
        Request Applicant to:
        <br />
        <Checkbox>add/update credential type</Checkbox>
        <br />
        <Checkbox>add/update credential</Checkbox>
        <br />
        <Checkbox>add/update credential translation</Checkbox>
        <br />
        <Checkbox>add/update issuing institution</Checkbox>
        <br />
        <Checkbox>add/update name on document</Checkbox>
      </Modal>
      <Button style={{ width: '100%', borderRadius: '0px' }} onClick={openModal}>
        <FilePdfOutlined /> Request Feedback
      </Button>
    </>
  );
};
