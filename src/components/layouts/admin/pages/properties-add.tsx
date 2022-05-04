import React from 'react';
import { PageHeader } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { PropertiesAddContainer } from '../components/properties-add-container';
import { useNavigate, useParams } from 'react-router-dom';

export const PropertiesAdd: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={<PageHeader title="Add Property" onBack={() => navigate('../')} />}
    >
      <PropertiesAddContainer data={{ communityId: params.communityId ?? '' }} />
    </SubPageLayout>
  );
};
