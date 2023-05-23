import { useQuery } from '@apollo/client';
import {
  SharedCommunityMenuContainerCommunitiesQueryDocument
} from '../../../../generated';

import { Menu, Spin } from 'antd';
import { useLocation, matchRoutes, useNavigate } from 'react-router-dom';

export interface CommunityMenuProps {
  onItemSelectedCallback: () => void;
  path: string;
}

export const CommunityMenu: React.FC<CommunityMenuProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(SharedCommunityMenuContainerCommunitiesQueryDocument);

  if (error) {
    return (
      <>
        <div>Error : {JSON.stringify(error)}</div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div>
          <Spin />
          Loading...{' '}
        </div>
      </>
    );
  }

  if (
    typeof data === 'undefined' ||
    typeof data.communities === 'undefined' ||
    data.communities === null
  ) {
    return (
      <>
        <div>No Data...</div>
      </>
    );
  }

  var menuPages = data.communities.map((community) => {
    return {
      key: community?.id,
      name: community?.name,
      path: `/community/${community?.id}/` + props.path,
    };
  });
  const matchedPages = matchRoutes(menuPages, location);

  const matchedIds = matchedPages ? matchedPages.map((x: any) => x.route.key.toString()) : [];
  const onMenuItemClicked = (e: any) => {
    props.onItemSelectedCallback();
    navigate(`/community/${e.key}` + props.path);
  };

  return (
    <Menu defaultSelectedKeys={matchedIds} theme="light" onClick={onMenuItemClicked}>
      {data.communities.map((community) => {
        if (community !== null) {
          return <Menu.Item key={community.id}>{community.name}</Menu.Item>;
        }
      })}
    </Menu>
  );
};
