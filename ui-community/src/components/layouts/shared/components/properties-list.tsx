import { Button, Table, TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { AdminPropertiesListContainerPropertyFieldsFragment, MembersPropertiesListContainerPropertyFieldsFragment } from '../../../../generated';

export interface PropertiesListProps {
  data: AdminPropertiesListContainerPropertyFieldsFragment[]|MembersPropertiesListContainerPropertyFieldsFragment[];
}

export const PropertiesList: React.FC<PropertiesListProps> = (props) => {
  const navigate = useNavigate();
  const columns:TableColumnsType<AdminPropertiesListContainerPropertyFieldsFragment|MembersPropertiesListContainerPropertyFieldsFragment> = [
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: any) => (
        <Button type="primary" size="small" onClick={() => navigate(text)}>
          Edit
        </Button>
      )
    },
    {
      title: 'Name',
      dataIndex: 'propertyName',
      key: 'propertyName'
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'memberName'],
      key: 'owner'
    },
    {
      title: 'Type',
      dataIndex: ['propertyType'],
      key: 'propertyType'
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={props.data} rowKey={(record: any) => record.id}/>
    </div>
  );
};
