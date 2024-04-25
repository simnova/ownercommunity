import { Button, Typography, Table, Dropdown, Space, Input as Search, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Community, Member } from '../../../../generated';
import { ColumnFilterItem } from 'antd/es/table/interface';
import { DownOutlined } from '@ant-design/icons';
import { ChangeEvent, useMemo, useState } from 'react';

const { Title } = Typography;

export interface CommunityListProps {
  data: {
    communities: Community[];
    members: Member[][];
  };
}

export const CommunityList: React.FC<CommunityListProps> = (props) => {
  const [communityList, setCommunityList] = useState(props.data.communities);
  const [displayNotFound, setDisplayNotFound] = useState(false);
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (searchValue == '') {
      setDisplayNotFound(false);
      setCommunityList(props.data.communities);
      return;
    }
    const filteredCommunities: Community[] = props.data.communities.filter(function (community: Community) {
      return community?.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    });
    if (filteredCommunities.length > 0) {
      setDisplayNotFound(false);
      setCommunityList(filteredCommunities);
    } else {
      setDisplayNotFound(true);
      setCommunityList(props.data.communities);
    }
  };

  const useCommunnityColumns = (props: CommunityListProps) =>
    useMemo(() => {
      const columns = [
        {
          title: 'Community Name',
          dataIndex: 'community',
          key: 'community',
          filters:
            communityList.map(
              (community) =>
                ({
                  text: community.name as string,
                  value: community.name as string
                } as ColumnFilterItem)
            ) ?? [],
          filterMode: 'menu' as 'menu',
          filterSearch: true,
          onFilter: (value: any, record: any) => record.community.indexOf(value as string) !== -1,
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
      return columns;
    }, [communityList]);

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
      {displayNotFound && (
        <Alert
        description="No matching communities found. Displaying all communities."
        type="error"
        style={{padding: 10, marginBottom: 10, width: '50%'}}
        />
      )}

      <Search placeholder="Search for a community" enterKeyHint="search" style={{ width: '50%' }} onChange={onChange} />
      <div className="w-full p-5 mx-auto my-5 shadow-lg rounded-lg">
        {items.length > 0 ? (
          <Table
            dataSource={items}
            columns={useCommunnityColumns(props)}
            sticky={{
              offsetHeader: 0
            }}
            pagination={{ position: ['topRight'] }}
          />
        ) : (
          <Title level={5} style={{ display: 'flex', justifyContent: 'center' }}>
            You currently don't have any communities. Please create a community using the button on the right or join
            one.
          </Title>
        )}
      </div>
    </div>
  );
};
