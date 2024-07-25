import { Button } from 'antd';
import { FC } from 'react';

interface ChatComponentButtonProps {
  icon: JSX.Element;
  modal: JSX.Element;
  text: string;
}
export const ChatComponentButton: FC<ChatComponentButtonProps> = (props) => {
  return (
    <>
      {props.modal}
      <Button style={{ width: '100%', borderRadius: '0px' }}>
        {props.icon}
        {props.text}
      </Button>
    </>
  );
};
