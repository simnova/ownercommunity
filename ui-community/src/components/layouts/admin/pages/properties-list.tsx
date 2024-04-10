import { PageHeader } from '@ant-design/pro-layout';
import { Button, theme } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import { PropertiesListContainer } from '../components/properties-list.container';
import { SubPageLayout } from '../sub-page-layout';

export const PropertiesList: React.FC<any> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
        title={
          <span style={{
            color: colorTextBase
          }}>Properties</span>
        }
          extra={[
            <Button type="primary" onClick={() => navigate('new')}>Add New</Button>
          ]}
        />}
      >
        <PropertiesListContainer data={{communityId:params.communityId}} />
    </SubPageLayout>
  )
}