import { Button, Table, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Role } from "../../../../generated";

export interface RolesListProps {
  data: Role[];
}

export const RolesList: React.FC<RolesListProps> = (props) => {
  const navigate = useNavigate();
  
  const columns:TableColumnsType<Role> = [
    {
      title: "Action",
      dataIndex: "id",
      render: (text: any) => <Button type="primary" size="small" onClick={() => navigate(text)}>Edit</Button>
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Is Default",
      dataIndex: "isDefault",
      key: "isDefault",
      render: (value: Role['isDefault']) => <span>{value?"true":"false"}</span>
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey={(record: Role) => record.id}
      />
    </div>
  )

}