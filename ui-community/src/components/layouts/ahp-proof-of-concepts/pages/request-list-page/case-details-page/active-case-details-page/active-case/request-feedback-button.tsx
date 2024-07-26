import { FilePdfOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';

interface RequestFeedbackButtonProps {
  updateEmbedding: (requests: any[]) => void;
}
export const RequestFeedbackButton: FC<RequestFeedbackButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState<any[]>([]);

  const valueMap: { [key: string]: string } = {
    '1': 'Request Update Credential Type',
    '2': 'Request Update Credential',
    '3': 'Request Update Translation',
    '4': 'Request Update Issuing Institution',
    '5': 'Request Update Name on Document'
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCheckedBoxes([])
    props.updateEmbedding(checkedBoxes);
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
      message: valueMap[e.target.value]
    });
    setCheckedBoxes(tempCheckedBoxes);
  };

  const isChecked = (value: string) => {
    const index = checkedBoxes.findIndex((x) => x.value === value)
    return index !== -1 ? true : false
  }
  
  return (
    <>
      <Modal title="Request Update" open={isOpen} onCancel={closeModal} onOk={closeModal}>
        Request Applicant to:
        <br />
        <Checkbox value={1} onClick={onCheck} checked={isChecked("1")}>
          {' '}
          add/update credential type
        </Checkbox>
        <br />
        <Checkbox value={2} onClick={onCheck} checked={isChecked('2')}>
          add/update credential
        </Checkbox>
        <br />
        <Checkbox value={3} onClick={onCheck} checked={isChecked('3')}>
          add/update credential translation
        </Checkbox>
        <br />
        <Checkbox value={4} onClick={onCheck} checked={isChecked('4')}>
          add/update issuing institution
        </Checkbox>
        <br />
        <Checkbox value={5} onClick={onCheck} checked={isChecked('5')}>
          add/update name on document
        </Checkbox>
      </Modal>
      <Button style={{ width: '100%', borderRadius: '0px' }} onClick={openModal}>
        <FilePdfOutlined /> Request Feedback
      </Button>
    </>
  );
};
