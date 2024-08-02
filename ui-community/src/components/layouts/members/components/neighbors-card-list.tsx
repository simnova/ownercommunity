import React from 'react';
import { useParams } from 'react-router-dom';
import { NeighborsCard } from './neighbors-card';

interface CardListProps {
  data: any;
}

export const NeighborsCardList: React.FC<CardListProps> = (props) => {
  const { memberId } = useParams();

  const generateCards = (data: any, _currentMemberId: string) => {
    return data.map((member: any) => {
      if (member.profile.showProfile) {
        return <NeighborsCard profile={member.profile} key={member.id} />;
      }
    });
  };

  return (
    <div style={{ display: 'flex' }}>{generateCards(props.data, memberId ?? '')}</div>
  );
};
