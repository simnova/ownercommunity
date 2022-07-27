import React from 'react';
import { useParams } from 'react-router-dom';
import { PropertiesLocationContainer } from '../../members/components/properties-location.container';

export const PropertiesLocation: React.FC<any> = (props) => {
  const params = useParams();
  
  return (
    <PropertiesLocationContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}} />
  )
}