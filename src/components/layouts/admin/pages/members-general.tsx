import React from 'react';
import { useParams } from 'react-router-dom';
import { MembersDetailContainer } from '../components/members-detail-container';

export const MembersGeneral: React.FC<any> = (props) => {
  const params = useParams();

  return (
    <div style={{display:'block',maxWidth:'fit-content' }}>
      <MembersDetailContainer data={{id:params.id ?? ''}} />
    </div>
      
  )
}