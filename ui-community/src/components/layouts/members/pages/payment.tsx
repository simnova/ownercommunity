import { PageHeader } from '@ant-design/pro-layout';
import { theme } from 'antd';
import { WalletContainer } from '../components/wallet.container';
import { SubPageLayout } from '../sub-page-layout';
import { CreditCardOutlined } from '@ant-design/icons';
import { GrTransaction } from 'react-icons/gr';
import TransactionsContainer from '../components/transactions.container';
import { VerticalTabs, RouteDefinition } from '../../../shared/vertical-tabs';

const Payment: React.FC = () => {

  const {
    token: { colorTextBase }
  } = theme.useToken();

 
  const pages:RouteDefinition[] = [
    { id: '1', link:'', path: '', title: 'Wallet', icon: <CreditCardOutlined />, element: <WalletContainer data={undefined} /> },
    { id: '2', link: 'transactions', path: 'transactions', title: 'Transactions', icon: <GrTransaction />, element: <TransactionsContainer /> }
  ];

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
      <VerticalTabs pages={pages} />
    </SubPageLayout>
  );
};

export default Payment;