import { useQuery } from '@apollo/client';
import { Transactions } from './transactions';
import { MemberTransactionsDocument } from '../../../../generated';
import { Descriptions, Empty, Skeleton } from 'antd';

interface TransactionsContainerProps {}

export const TransactionsContainer: React.FC<TransactionsContainerProps> = () => {
  const {
    data: transactions,
    error: transactionsError,
    loading: transactionsLoading
  } = useQuery(MemberTransactionsDocument);

  if (transactionsLoading) return <Skeleton active />;

  if (transactionsError) return <Empty description={transactionsError.message} />;
  // calculate total amount
  let totalAmount = 0;
  if (transactions?.violationTicketPaymentTransactions?.length) {
    totalAmount = transactions.violationTicketPaymentTransactions.reduce((acc, transaction) => {
      if (transaction?.amount) {
        return acc + transaction?.amount;
      }
      return acc;
    }, 0);
  }
  return (
    <>
      {transactionsError || !transactions?.violationTicketPaymentTransactions ? (
        <Empty />
      ) : (
        <div>
          <h1>Transaction Summary</h1>
          <Descriptions
            size={'small'}
            layout={'vertical'}
            labelStyle={{ fontSize: '14px' }}
            contentStyle={{ fontSize: '16px', fontWeight: 500 }}
            >
            {/* TODO: Calculate total received on basis of adhoc transaction negative amount*/}
            <Descriptions.Item label="Total Received">${0}</Descriptions.Item>
            <Descriptions.Item label="Total Sent">${totalAmount}</Descriptions.Item>
          </Descriptions>
            <h1>Transactions</h1>
          <Transactions transactions={transactions?.violationTicketPaymentTransactions} />
        </div>
      )}
    </>
  );
};
