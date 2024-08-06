import { FilePdfOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal } from 'antd';
import { FC, useState } from 'react';

interface RequestFeedbackButtonProps {
  updateEmbedding: (requests: any[]) => void;
}
export const RequestFeedbackButton: FC<RequestFeedbackButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState<any[]>([]);

  const valueMap: { [key: string]: string } = {
    updateAssignment: 'Request Update to Assignment',
    updateProperty: 'Request Update to Property',
    updateStatus: 'Request Update to Status',
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    props.updateEmbedding(checkedBoxes);
    setCheckedBoxes([]);
  };

  const onCancel = () => {
    setIsOpen(false);
    setCheckedBoxes([]);
  };

  const onCheck = (e: any) => {
    let tempCheckedBoxes = checkedBoxes.slice();
    const index = tempCheckedBoxes.findIndex((x) => x.value === e.target.value);
    if (index !== -1) {
      tempCheckedBoxes.splice(index, 1);
      setCheckedBoxes(tempCheckedBoxes);
      return;
    }
    tempCheckedBoxes.push({
      value: e.target.value,
      message: valueMap[e.target.value],
      icon: <FilePdfOutlined />
    });
    setCheckedBoxes(tempCheckedBoxes);
  };

  const isChecked = (value: string) => {
    const index = checkedBoxes.findIndex((x) => x.value === value);
    return index !== -1;
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
        <Checkbox value={'updateAssignment'} onClick={onCheck} checked={isChecked('updateAssignment')}>
          {' '}
          add/update assignment
        </Checkbox>
        <br />
        <Checkbox value={'updateProperty'} onClick={onCheck} checked={isChecked('updateProperty')}>
          add/update property
        </Checkbox>
        <br />
        <Checkbox value={'updateStatus'} onClick={onCheck} checked={isChecked('updateStatus')}>
          add/update status
        </Checkbox>
      </Modal>
      <Button style={{ width: '100%', borderRadius: '0px' }} onClick={openModal}>
        <FilePdfOutlined /> Request Feedback
      </Button>
    </>
  );
};
