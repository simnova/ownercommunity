import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Table, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Member } from "../../../../generated";


export const MembersAccountsList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const columns:TableColumnsType<Member> = [
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
      dataIndex: ['user', 'email'],
      key: "email"
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    },
  ]

  return (<>
    <Button onClick={() => navigate('./add')} icon={<UsergroupAddOutlined />}>Add Account</Button>
    <div>
      <Table 
        columns={columns} 
        dataSource={props.data}
        rowKey={(record: any) => record.id}
      />
    </div>
  </>)
}