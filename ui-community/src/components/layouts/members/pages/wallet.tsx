import { PageHeader } from '@ant-design/pro-layout';
import { Col, Menu, Row, theme } from 'antd';
import { BillingInfoContainer } from '../components/billing-info.container';
import { SubPageLayout } from '../sub-page-layout';
import { CreditCardOutlined } from '@ant-design/icons';
import { Link, Route, Routes, matchRoutes, useLocation } from 'react-router-dom';

const Wallet: React.FC = () => {
  const location = useLocation();

  const {
    token: { colorTextBase }
  } = theme.useToken();

  const pages = [
    {
      id: '1',
      path: '/community/:communityId/member/:memberId/wallet/billing-info',
      title: 'Billing Info',
      icon: <CreditCardOutlined />
    }
  ];

  const matchedPages = matchRoutes(pages, location);
  const matchedIds = matchedPages ? matchedPages.map((x: any) => x.route.id.toString()) : [];
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
              Billing Info
            </span>
          }
        />
      }
    >
      <Row
        style={{
          color: colorTextBase
        }}
      >
        <Col span={6}>
          <Menu mode="inline" selectedKeys={matchedIds}>
            <Menu.Item key="1" icon={<CreditCardOutlined />}>
              <Link to="billing-info">Billing Info</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={18} style={{ paddingLeft: '24px' }}>
          <Routes>
            <Route path="/billing-info" element={<BillingInfoContainer data={undefined} />} />
          </Routes>
        </Col>
      </Row>
    </SubPageLayout>
  );
};

export default Wallet;
