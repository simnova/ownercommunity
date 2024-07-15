import { PageHeader } from '@ant-design/pro-layout';
import { Col, Menu, Row, theme } from 'antd';
import { BillingInfoContainer } from '../../shared/components/billing-info.container';
import { SubPageLayout } from '../sub-page-layout';

import { GrTransaction } from 'react-icons/gr';
import { UserOutlined } from '@ant-design/icons';
import { Link, Route, Routes, matchRoutes } from 'react-router-dom';
import WalletCustomerInfoContainer from '../components/wallet-customer-info.container';

const Wallet: React.FC = () => {
  const {
    token: { colorTextBase }
  } = theme.useToken();

  const pages = [
    { id: '1', path: 'wallet/', title: 'Customer Info', icon: <UserOutlined /> },
    { id: '2', path: 'wallet/billing-info', title: 'Billing Info', icon: <GrTransaction /> }
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
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="">Customer Info</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<GrTransaction />}>
              <Link to="billing-info">Billing Info</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={18} style={{ paddingLeft: '24px' }}>
          <Routes>
            <Route path="" element={<WalletCustomerInfoContainer />} />
            <Route path="/billing-info" element={<BillingInfoContainer data={undefined} />} />
          </Routes>
        </Col>
      </Row>
    </SubPageLayout>
  );
};

export default Wallet;
