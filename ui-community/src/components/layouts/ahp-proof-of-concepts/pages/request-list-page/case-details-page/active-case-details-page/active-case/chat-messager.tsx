import TextArea from 'antd/lib/input/TextArea';
import { FC } from 'react';
import { ChatComponentButton } from './chat-component-button';
import { DollarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { RequestFeedbackButton } from './request-feedback-button';

interface ChatMessagerProps {}
export const ChatMessager: FC<ChatMessagerProps> = () => {
  return (
    <div style={{ gridColumn: 1, border: '1px solid black', borderTop: '0px', width: '75%', display: 'flex' }}>
      <div
        style={{
          padding: '15px 20px',
          width: '85%'
        }}
      >
        <div
          style={{
            paddingBottom: '10px'
          }}
        >
          Message
        </div>
        <TextArea
          style={{ borderRadius: '0px' }}
          autoSize={{
            minRows: 3,
            maxRows: 5
          }}
        />
        <div
          style={{
            width: 'auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignContent: 'stretch'
          }}
        >
          <RequestFeedbackButton />
          <ChatComponentButton modal={<></>} icon={<DollarOutlined />} text={'Request Payment'} />
          <ChatComponentButton modal={<></>} icon={<DollarOutlined />} text={'Send Money'} />
        </div>
      </div>
      <Button
        style={{
          marginTop: '40px',
          marginLeft: '10px'
        }}
      >
        Send
      </Button>
    </div>
  );
};
