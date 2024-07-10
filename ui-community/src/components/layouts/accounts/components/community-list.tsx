import { Button, Typography, Table, Dropdown, Space, Input as Search } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Community, Member } from '../../../../generated';
import { DownOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import TestPdfView from '../../../testing/TestPdfView';

const { Title } = Typography;

export interface CommunityListProps {
  data: {
    communities: Community[];
    members: Member[][];
  };
}

export const CommunityList: React.FC<CommunityListProps> = (props) => {
  const [communityList, setCommunityList] = useState(props.data.communities);
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (searchValue == '') {
      setCommunityList(props.data.communities);
      return;
    }
    const filteredCommunities: Community[] = props.data.communities.filter(function (community: Community) {
      return community?.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    });
    setCommunityList(filteredCommunities);
  };

  const columns = [
    {
      title: 'Community Name',
      dataIndex: 'community',
      key: 'community',
      width: '30%'
    },
    {
      title: 'Member Portal',
      dataIndex: 'memberPortal',
      key: 'memberPortal'
    },
    {
      title: 'Admin Portal',
      dataIndex: 'adminPortal',
      key: 'adminPortal'
    }
  ];
  let items = communityList.map((community: any, i: number) => ({
    key: community.id,
    community: community.name,
    memberPortal: (
      <Dropdown
        menu={{
          items: props.data?.members[i]?.map((member: Member) => ({
            key: member.id as string,
            label: <a onClick={() => navigate(`/community/${community.id}/member/${member.id}`)}>{member.memberName}</a>
          }))
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Member Portals
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    ),
    adminPortal: (
      <Dropdown
        menu={{
          items: props.data?.members[i]
            ?.filter((member) => member.isAdmin)
            .map((member: Member) => ({
              key: member.id as string,
              label: (
                <a onClick={() => navigate(`/community/${community.id}/admin/${member.id}`)}>{member.memberName}</a>
              )
            }))
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Admin Portals
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    )
  }));

  return (
    <div>
      <div className="flex justify-between">
        <h1>Navigate to a Community</h1>
        <Button type="primary" onClick={() => navigate('create-community')}>
          Create a Community
        </Button>
      </div> 
      <Search placeholder="Search for a community" enterKeyHint="search" style={{ width: '50%' }} onChange={onChange} />
      <div className="w-full p-5 mx-auto my-5 shadow-lg rounded-lg">
        {items.length > 0 ? (
          <Table
            dataSource={items}
            columns={columns}
            sticky={{
              offsetHeader: 0
            }}
            pagination={{ position: ['topRight'] }}
          />
        ) : (
          <Title level={5} style={{ display: 'flex', justifyContent: 'center' }}>
            No communities found.
          </Title>
        )}
      </div>
      <TestPdfView/>
    </div>
  );
};
