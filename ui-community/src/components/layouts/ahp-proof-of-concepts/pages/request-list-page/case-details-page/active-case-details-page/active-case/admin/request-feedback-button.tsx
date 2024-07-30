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
    updateCredentialType: 'Request Update Credential Type',
    updateCredential: 'Request Update Credential',
    updateTranslation: 'Request Update Translation',
    updateInstitution: 'Request Update Issuing Institution',
    updatedName: 'Request Update Name on Document'
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
    return index !== -1 ? true : false;
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
        <Checkbox value={'updateCredentialType'} onClick={onCheck} checked={isChecked('updateCredentialType')}>
          {' '}
          add/update credential type
        </Checkbox>
        <br />
        <Checkbox value={'updateCredential'} onClick={onCheck} checked={isChecked('updateCredential')}>
          add/update credential
        </Checkbox>
        <br />
        <Checkbox value={'updateTranslation'} onClick={onCheck} checked={isChecked('updateTranslation')}>
          add/update credential translation
        </Checkbox>
        <br />
        <Checkbox value={'updateInstitution'} onClick={onCheck} checked={isChecked('updateInstitution')}>
          add/update issuing institution
        </Checkbox>
        <br />
        <Checkbox value={'updatedName'} onClick={onCheck} checked={isChecked('updatedName')}>
          add/update name on document
        </Checkbox>
      </Modal>
      <Button style={{ width: '100%', borderRadius: '0px' }} onClick={openModal}>
        <FilePdfOutlined /> Request Feedback
      </Button>
    </>
  );
};
