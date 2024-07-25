import { Table } from 'antd';

import dayjs from 'dayjs';

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    key: 'transactionId'
  },
  {
    title: 'Reference Code',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Amount',
    dataIndex: ['amount', 'currency'],
    key: 'amount',
    render: (text: string, record: any) => `${record.amount} ${record.currency}`
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Timestamp',
    dataIndex: 'successTimestamp',
    key: 'successTimestamp',
    render: (text: string) => dayjs(text).toISOString()
  }
];

interface TransactionsProps {
  transactions: any[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return <Table columns={columns} pagination={{ position: ['bottomRight'] }} dataSource={transactions} />;
};

export default Transactions;
