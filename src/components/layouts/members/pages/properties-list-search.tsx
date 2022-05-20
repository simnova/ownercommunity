import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams } from 'react-router-dom';
import { PropertiesListSearchContainer } from '../components/properties-list-search-container';

export const PropertiesListSearch: React.FC<any> = (_props) => {
  const params = useParams();
  return (
    <SubPageLayout fixedHeader={false} header={<PageHeader title="Properties Search" />}>
      <PropertiesListSearchContainer data={{ communityId: params.communityId }} />
    </SubPageLayout>
  );
};
