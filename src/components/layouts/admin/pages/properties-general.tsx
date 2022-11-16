import React from 'react';
import { useParams } from 'react-router-dom';
import { PropertiesDetailContainer } from '../components/properties-detail.container';

export const PropertiesGeneral: React.FC<any> = (props) => {
  const params = useParams();

  return (
    <PropertiesDetailContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}} />
  )
}