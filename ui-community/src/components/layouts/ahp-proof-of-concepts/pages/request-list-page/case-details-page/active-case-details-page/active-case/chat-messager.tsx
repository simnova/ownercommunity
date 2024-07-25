import { FC } from 'react';

interface ChatMessagerProps {}
export const ChatMessager: FC<ChatMessagerProps> = (props) => {
  return <div style={{ gridColumn: 1, border: '1px solid black', width: '75%' }}> Messager</div>;
};
