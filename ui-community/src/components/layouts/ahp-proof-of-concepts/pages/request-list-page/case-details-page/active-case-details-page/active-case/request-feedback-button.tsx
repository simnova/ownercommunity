import { FilePdfOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal } from 'antd';
import { FC, useState } from 'react';
import * as CmsComponents from '../../../../../../../editor/components';

interface RequestFeedbackButtonProps {
  updateEmbedding: (embeddingName: string | undefined, embedding: JSX.Element | undefined) => void;
}
export const RequestFeedbackButton: FC<RequestFeedbackButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (checkedBoxes.length !== 0) {
      switch (checkedBoxes[0]) {
        case '1':
          props.updateEmbedding('Request Updated Credential Type', <CmsComponents.AhpIdFormConfirmation />);
          return;
        case '2':
          props.updateEmbedding('Request Updated Credential', <CmsComponents.AhpIdFormConfirmation />);
          return;
        case '3':
          props.updateEmbedding('Request Updated Translation', <CmsComponents.AhpIdFormConfirmation />);
          return;
        case '4':
          props.updateEmbedding('Request Updated Issuing Institution', <CmsComponents.AhpIdFormConfirmation />);
          return;
        case '5':
          props.updateEmbedding('Request Updated Name on Document', <CmsComponents.AhpIdFormConfirmation />);
          return;
        default:
          props.updateEmbedding('', undefined);
          return;
      }
    }
    props.updateEmbedding('', undefined);
  };

  const onCheck = (e: any) => {
    console.log('checkboxdata', e.target.value, checkedBoxes);
    if (checkedBoxes.length !== 0 && checkedBoxes.includes(e.target.value)) {
      setCheckedBoxes([]);
      return;
    } else if (checkedBoxes.length !== 0) {
      alert('Can only select one option.');
      return;
    }

    let tempCheckedBoxes = checkedBoxes;
    tempCheckedBoxes = [e.target.value];
    setCheckedBoxes(tempCheckedBoxes);
  };

  return (
    <>
      <Modal title="Request Update" open={isOpen} onCancel={closeModal} onOk={closeModal}>
        Request Applicant to:
        <br />
        <Checkbox value={1} onClick={onCheck} checked={checkedBoxes.includes('1')}>
          {' '}
          add/update credential type
        </Checkbox>
        <br />
        <Checkbox value={2} onClick={onCheck} checked={checkedBoxes.includes('2')}>
          add/update credential
        </Checkbox>
        <br />
        <Checkbox value={3} onClick={onCheck} checked={checkedBoxes.includes('3')}>
          add/update credential translation
        </Checkbox>
        <br />
        <Checkbox value={4} onClick={onCheck} checked={checkedBoxes.includes('4')}>
          add/update issuing institution
        </Checkbox>
        <br />
        <Checkbox value={5} onClick={onCheck} checked={checkedBoxes.includes('5')}>
          add/update name on document
        </Checkbox>
      </Modal>
      <Button style={{ width: '100%', borderRadius: '0px' }} onClick={openModal}>
        <FilePdfOutlined /> Request Feedback
      </Button>
    </>
  );
};
