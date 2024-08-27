import { PageHeader } from '@ant-design/pro-layout';
import { Button, theme } from 'antd';
import { SubPageLayout } from '../sub-page-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceTicketsListContainer } from '../components/service-tickets-list.container';
import { Helmet } from 'react-helmet-async';

export const ServiceTicketsList: React.FC<any> = (_props) => {
  const {
    token: { colorTextBase }
  } = theme.useToken();
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
          }}>Tickets</span>
        }
          extra={[
            <Button key="service-ticket-add-button" type="primary" onClick={() => navigate('new')}>
              Add New
            </Button>
          ]}
        />
      }
    >
      <Helmet>
        <title>Tickets</title>
      </Helmet>
      <ServiceTicketsListContainer data={{ communityId: params.communityId }} />
    </SubPageLayout>
  );
};
