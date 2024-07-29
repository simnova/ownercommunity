import { PageHeader } from '@ant-design/pro-layout';
import { Col, Menu, Row, theme } from 'antd';
import { WalletContainer } from '../components/wallet.container';
import { SubPageLayout } from '../sub-page-layout';
import { CreditCardOutlined } from '@ant-design/icons';
import { GrTransaction } from 'react-icons/gr';
import { Link, Route, Routes, matchRoutes, useLocation } from 'react-router-dom';
import TransactionsContainer from '../components/transactions.container';

const Payment: React.FC = () => {
  const location = useLocation();

  const {
    token: { colorTextBase }
  } = theme.useToken();

  const pages = [
    {
      id: '1',
      path: '/community/:communityId/member/:memberId/payment/wallet',
      title: 'Billing Info',
      icon: <CreditCardOutlined />
    },
    {
      id: '2',
      path: '/community/:communityId/member/:memberId/payment/transactions',
      title: 'Transactions',
      icon: <GrTransaction />
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
              Payment
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
              <Link to="wallet">Wallet</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<GrTransaction />}>
              <Link to="transactions">Transactions</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={18} style={{ paddingLeft: '24px' }}>
          <Routes>
            <Route path="/wallet" element={<WalletContainer data={undefined} />} />
            <Route path="/transactions" element={<TransactionsContainer />} />
          </Routes>
        </Col>
      </Row>
    </SubPageLayout>
  );
};

export default Payment;
