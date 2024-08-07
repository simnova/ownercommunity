import { Table } from 'antd';

import dayjs from 'dayjs';

const columns = [
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text: string) => dayjs(text).format('DD-MMM-YYYY')
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Activity',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text: string) => `Sent ${dayjs(text).format('DD-MMM-YYYY')}`
  }
];

interface TransactionsProps {
  transactions: any[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return <Table columns={columns} pagination={{ position: ['bottomRight'] }} rowKey={(record) => record.transactionId} dataSource={transactions} />;
};

export default Transactions;
