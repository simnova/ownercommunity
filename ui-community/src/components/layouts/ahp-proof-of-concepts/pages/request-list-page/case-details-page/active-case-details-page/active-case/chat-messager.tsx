import TextArea from 'antd/lib/input/TextArea';
import { FC, useState } from 'react';
import { ChatComponentButton } from './chat-component-button';
import { DollarOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { RequestFeedbackButton } from './request-feedback-button';

interface ChatMessagerProps {}
export const ChatMessager: FC<ChatMessagerProps> = () => {
  const [message, setMessage] = useState('');
  const [embedding, setEmbedding] = useState<JSX.Element | undefined>(undefined);
  const [embeddingName, setEmbeddingName] = useState<string | undefined>(undefined);

  const updateEmbedding = (embeddingName: string | undefined, embedding: JSX.Element | undefined) => {
    setEmbedding(embedding);
    setEmbeddingName(embeddingName);
  };
  const sendMessage = () => {
    console.log('Heres the message: ', message, embedding);
  };

  const removeEmbed = () => {
    setEmbedding(undefined);
    setEmbeddingName(undefined);
  };

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
        {embedding && embeddingName && (
          <Tag onClose={removeEmbed} closable>
            <FilePdfOutlined /> {embeddingName}
          </Tag>
        )}
        <TextArea
          style={{ borderRadius: '0px' }}
          autoSize={{
            minRows: 3,
            maxRows: 5
          }}
          onChange={(e: any) => setMessage(e.target.value)}
        />
        <div
          style={{
            width: 'auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignContent: 'stretch'
          }}
        >
          <RequestFeedbackButton updateEmbedding={updateEmbedding} />
          <ChatComponentButton modal={<></>} icon={<DollarOutlined />} text={'Request Payment'} />
          <ChatComponentButton modal={<></>} icon={<DollarOutlined />} text={'Send Money'} />
        </div>
      </div>
      <Button
        style={{
          marginTop: '40px',
          marginLeft: '10px'
        }}
        onClick={sendMessage}
      >
        Send
      </Button>
    </div>
  );
};
