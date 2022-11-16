import React from 'react';
import { useParams } from 'react-router-dom';
import { PropertiesListingContainer } from '../../members/components/properties-listing.container';

export const PropertiesListing: React.FC<any> = (_props) => {
  const params = useParams();

  return (
    <PropertiesListingContainer data={{id:params.id ?? '', communityId:params.communityId ?? ''}} />
  )
}