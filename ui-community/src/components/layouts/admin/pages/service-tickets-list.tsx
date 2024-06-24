import { PageHeader } from '@ant-design/pro-layout';
import { Dropdown, MenuProps, theme } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import { ServiceTicketsListContainer } from '../components/tickets-list.container';
import { SubPageLayout } from '../sub-page-layout';

export const ServiceTicketsList: React.FC<any> = () => {
  const {
    token: { colorTextBase }
  } = theme.useToken();
  const params = useParams();
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: 'Service Request',
      key: 'service-request'
    },
    {
      label: 'Violation',
      key: 'violation'
    }
  ];

  const menuProps: MenuProps = {
    items,
    onClick: ({ key }) => {
      navigate(`new/${key}`);
    }
  };

  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader
          title={
            <span
              style={{
                color: colorTextBase
              }}
            >
              Tickets
            </span>
          }
          extra={[
            <Dropdown.Button
              key="add-new"
              menu={menuProps}
              type="primary"
              onClick={() => {
                navigate('new/service-request');
              }}
            >
              Add New
            </Dropdown.Button>
          ]}
        />
      }
    >
      <ServiceTicketsListContainer data={{ communityId: params.communityId }} />
    </SubPageLayout>
  );
};
