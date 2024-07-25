import { FC } from 'react';

interface ChatProps {
  caseId: string;
}
export const Chat: FC<ChatProps> = (props) => {
  return (
    <>
      Chat {props.caseId}
    </>
  );
}