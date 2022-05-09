import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  AdminCommunityMenuContainerCommunitiesQueryDocument,
  CommunityListContainerCommunitiesQueryDocument
} from '../../../../generated';
import PropTypes, { InferProps } from 'prop-types';

import { Menu, Spin } from 'antd';
import { Link, useLocation, matchRoutes, useNavigate } from 'react-router-dom';
import path from 'path';

const ComponentPropTypes = {
  onItemSelectedCallback: PropTypes.func
};

export interface ComponentProp {
  onItemSelectedCallback: () => void;
}

export type ComponentProps = InferProps<typeof ComponentPropTypes> & ComponentProp;

export const CommunityMenu: FC<any> = ({ onItemSelectedCallback }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(CommunityListContainerCommunitiesQueryDocument, {
    variables: {}
  });

  if (error) {
    return (
      <>
        <div>Error :( {JSON.stringify(error)}</div>
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
      path: `/community/${community?.id}/admin/*`
    };
  });
  const matchedPages = matchRoutes(menuPages, location);

  const matchedIds = matchedPages ? matchedPages.map((x: any) => x.route.key.toString()) : [];
  const onMenuItemClicked = (e: any) => {
    onItemSelectedCallback();
    navigate(`/community/${e.key}/admin`);
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
