import TextArea from 'antd/lib/input/TextArea';
import { FC } from 'react';
import { ChatComponentButton } from './chat-component-button';
import { DollarOutlined, FilePdfFilled, FilePdfOutlined } from '@ant-design/icons';

interface ChatMessagerProps {}
export const ChatMessager: FC<ChatMessagerProps> = (props) => {
  return (
    <div style={{ gridColumn: 1, border: '1px solid black', width: '75%'}}>
      <div
        style={{
          padding: '15px 20px'
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
          <ChatComponentButton modal={<></>} icon={<FilePdfOutlined />} text={'Request Update'} />
          <ChatComponentButton modal={<></>} icon={<DollarOutlined />} text={'Request Payment'} />
          <ChatComponentButton modal={<></>} icon={<DollarOutlined />} text={'Send Money'} />
        </div>
      </div>
    </div>
  );
};
