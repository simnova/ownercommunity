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
    render: (_: string, record: any) => `${record.currency === 'USD' ? '$' : ''}${record.amount}`
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
    title: 'Date',
    dataIndex: 'successTimestamp',
    key: 'successTimestamp',
    render: (text: string) => dayjs(text).format('DD-MMM-YYYY HH:mm A')
  }
];

interface TransactionsProps {
  transactions: any[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return <Table columns={columns} pagination={{ position: ['bottomRight'] }} rowKey={(record) => record.transactionId} dataSource={transactions} />;
};

export default Transactions;
