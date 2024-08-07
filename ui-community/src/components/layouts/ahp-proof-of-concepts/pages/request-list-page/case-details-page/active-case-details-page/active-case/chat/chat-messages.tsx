import { FC, useEffect, useRef, useState } from 'react';
import { ChatMessage } from './chat-message';
import { ServiceTicket, ViolationTicket } from '../../../../../../../../../generated';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface ChatMessagesProps {
  data: ServiceTicket | ViolationTicket;
  isAdmin: boolean;
}
export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  const [display, setDisplay] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollY = containerRef.current.scrollTop;
      if (scrollY < 1200) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollToSection = () => {
    document.getElementById('bottom')?.scrollIntoView({ block: 'end' });
  };

  useEffect(() => {
    scrollToSection();
  }, [props.data]);

  return (
    <div
      style={{
        gridColumn: 1,
        border: '1px solid black',
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '400px',
        minHeight: '500px'
      }}
      ref={containerRef}
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
        icon={<DownOutlined />}
        onClick={scrollToSection}
        size={'small'}
        style={{ width: '10%', position: 'fixed', borderRadius: '10px', color: 'black' }}
        hidden={!display}
      >
        Back to bottom
      </Button>
      <div id="bottom"></div>
    </div>
  );
};
