import { Button, Table, TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { AdminMembersListContainerMemberFieldsFragment } from '../../../../generated';

export interface MembersListProps {
  data: AdminMembersListContainerMemberFieldsFragment[];
}

export const MembersList: React.FC<MembersListProps> = (props) => {
  const navigate = useNavigate();
  const columns:TableColumnsType<AdminMembersListContainerMemberFieldsFragment> = [
    {
      title: "Action",
      dataIndex: "id",
      render: (text: any) => <Button type="primary" size="small" onClick={() => navigate(text)}>Edit</Button>
    },
    {
      title: "Member",
      dataIndex: "memberName",
      key: "memberName",
    },
    {
      title: "Role",
      dataIndex: ["role", "roleName"],  
      key: "role",
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey={(record: AdminMembersListContainerMemberFieldsFragment) => record.id}
      />
    </div>
  );
}