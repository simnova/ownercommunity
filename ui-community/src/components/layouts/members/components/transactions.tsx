import { Table } from 'antd';
import dayjs from 'dayjs';

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    key: 'transactionId'
  },
  {
    title: 'Client Reference Code',
    dataIndex: 'clientReferenceCode',
    key: 'clientReferenceCode'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Timestamp',
    dataIndex: 'transactionTime',
    key: 'transactionTime',
    render: (text: string) => dayjs(text).toISOString()
  }
];

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = ({}) => {
  return <Table columns={columns} pagination={{ position: ['bottomRight'] }} />;
};

export default Transactions;
