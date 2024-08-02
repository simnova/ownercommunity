import { useQuery } from '@apollo/client';
import Transactions from './transactions';
import { MemberTransactionsDocument } from '../../../../generated';
import { Empty, Skeleton } from 'antd';

interface TransactionsContainerProps {}

const TransactionsContainer: React.FC<TransactionsContainerProps> = () => {
  const {
    data: transactions,
    error: transactionsError,
    loading: transactionsLoading
  } = useQuery(MemberTransactionsDocument);

  if (transactionsLoading) return <Skeleton active />;

  if (transactionsError) return <Empty description={transactionsError.message} />;

  return (
    <>
      {transactionsError || !transactions?.violationTicketPaymentTransactions ? (
        <Empty />
      ) : (
        <div>
          <h1>Transactions</h1>
          <Transactions transactions={transactions?.violationTicketPaymentTransactions} />
        </div>
      )}
    </>
  );
};

export default TransactionsContainer;
