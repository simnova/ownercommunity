import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Table, TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { AdminMembersAccountsListContainerMemberFieldsFragment } from '../../../../generated';

export interface MembersAccountsListProps {
  data: AdminMembersAccountsListContainerMemberFieldsFragment[];
}

export const MembersAccountsList: React.FC<MembersAccountsListProps> = (props) => {
  const navigate = useNavigate();
  const columns:TableColumnsType<AdminMembersAccountsListContainerMemberFieldsFragment> = [
    {
      title: "Action",
      dataIndex: "id",
      render: (text: any) => <Button type="primary" size="small" onClick={() => navigate(text)}>Edit</Button>
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: 'lastName',
      key: "lastName"
    },
    {
      title: "Status",
      dataIndex: 'statusCode',
      key: "statusCode"
    },
    {
      title: "User",
      dataIndex: ['user', 'id'],
      key: "userId"
    },
    {
      title: "Email",
      dataIndex: ['user', 'personalInformation', 'contactInformation', 'email'],
      key: "email"
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    },
  ]

  return (<>
    <Button onClick={() => navigate('./add')} icon={<UsergroupAddOutlined />}>Add Account</Button>
    <div>
      <Table 
        columns={columns} 
        dataSource={props.data}
        rowKey={(record: AdminMembersAccountsListContainerMemberFieldsFragment) => record.id}
      />
    </div>
  </>)
}