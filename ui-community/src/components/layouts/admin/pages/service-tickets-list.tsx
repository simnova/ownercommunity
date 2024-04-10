import { PageHeader } from '@ant-design/pro-layout';
import { Button, theme } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import { ServiceTicketsListContainer } from '../components/service-tickets-list.container';
import { SubPageLayout } from '../sub-page-layout';

export const ServiceTicketsList: React.FC<any> = () => {
  const {
    token: {
      colorTextBase
    }
  }=theme.useToken()
  const params = useParams();
  const navigate = useNavigate();
  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
        title={
          <span style={{
            color: colorTextBase
          }}>Service Tickets</span>
        }
          extra={[
            <Button type="primary" onClick={() => navigate('new')}>
              Add New
            </Button>
          ]}
        />
      }
    >
      <ServiceTicketsListContainer data={{ communityId: params.communityId }} />
    </SubPageLayout>
  );
};
