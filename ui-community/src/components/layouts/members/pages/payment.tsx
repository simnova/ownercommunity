import { PageHeader } from '@ant-design/pro-layout';
import { Col, Menu, Row, theme } from 'antd';
import { WalletContainer } from '../components/wallet.container';
import { SubPageLayout } from '../sub-page-layout';
import { CreditCardOutlined } from '@ant-design/icons';
import { GrTransaction } from 'react-icons/gr';
import { Link, Route, Routes, matchRoutes, useLocation, useResolvedPath } from 'react-router-dom';
import TransactionsContainer from '../components/transactions.container';

const Payment: React.FC = () => {
  const location = useLocation();

  const {
    token: { colorTextBase }
  } = theme.useToken();

  const pathLocations = {
    wallet: '',
    transactions: 'transactions'
  };

  const pages = [
    {
      id: '1',
      path: useResolvedPath(pathLocations.wallet).pathname,
      title: 'Billing Info',
      icon: <CreditCardOutlined />
    },
    {
      id: '2',
      path: useResolvedPath(pathLocations.transactions).pathname,
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
        <Col span={4}>
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
            <Route path={pathLocations.wallet} element={<WalletContainer data={undefined} />} />
            <Route path={pathLocations.transactions} element={<TransactionsContainer />} />
          </Routes>
        </Col>
      </Row>
    </SubPageLayout>
  );
};

export default Payment;
