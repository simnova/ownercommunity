import { FC, useEffect, useRef, useState } from 'react';
import { ChatMessage } from './chat-message';
import { ServiceTicket, ViolationTicket } from '../../../../../../../../../generated';
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { debounce } from 'lodash';

interface ChatMessagesProps {
  data: ServiceTicket | ViolationTicket;
  isAdmin: boolean;
}
export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  const [display, setDisplay] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  const handleScroll = debounce(() => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      const scrollableHeight = scrollHeight - clientHeight;
      const scrolledPercentage = scrollTop / scrollableHeight;
      if (scrolledPercentage < 0.7) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  }, 50);

  const scrollToBottom = () => {
    const div = divRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.data]);

  return (
    <div
      style={{
        gridColumn: 1,
        background: '#2a2e360d',
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '400px',
        minHeight: '500px',
        borderRadius: '8px',
        padding: 10
      }}
      ref={divRef}
      onScroll={handleScroll}
    >
      {props?.data?.messages?.map((message: any) => {
        return (
          <ChatMessage
            key={message.id}
            id={message.id}
            sentBy={message.sentBy}
            message={message.message}
            embedding={message.embedding}
            createdAt={message.createdAt}
            isAdmin={props.isAdmin}
          />
        );
      })}
      <Button
        onClick={scrollToBottom}
        size={'small'}
        style={{
          width: '10%',
          position: 'fixed',
          borderRadius: '8px',
          color: 'black',
          marginLeft: 10,
          background: '#D3D3D380'
        }}
        hidden={!display}
      >
        Return to Bottom
        <DownOutlined />
      </Button>
      <div id="bottom"></div>
    </div>
  );
};
