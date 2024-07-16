import Transactions from './transactions';

interface TransactionsContainerProps {}

const TransactionsContainer: React.FC<TransactionsContainerProps> = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <Transactions />
    </div>
  );
};

export default TransactionsContainer;
