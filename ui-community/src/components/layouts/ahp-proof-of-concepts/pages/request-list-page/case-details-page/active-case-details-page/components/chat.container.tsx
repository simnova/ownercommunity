import { FC } from 'react';
import { Chat } from './chat';
import { useParams } from 'react-router-dom';
import { AHPObjectIDRouteLayer } from '../..';

interface ChatContainerProps {}
export const ChatContainer: FC<ChatContainerProps> = (_props) => {
  const params = useParams();
  return <Chat caseId={params[AHPObjectIDRouteLayer.CaseId] ?? ""}/>;
};
