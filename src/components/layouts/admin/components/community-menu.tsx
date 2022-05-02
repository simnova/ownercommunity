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
  onItemSelected: PropTypes.func
};

export interface ComponentProp {
  onItemSelected: (communityName: string) => void;
}

export type ComponentProps = InferProps<typeof ComponentPropTypes> & ComponentProp;

export const CommunityMenu: FC<any> = ({ onItemSelected }) => {
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
      path: `/community/${community?.id}/admin`
    };
  });
  const matchedPages = matchRoutes(menuPages, location);
  const matchedIds = matchedPages ? matchedPages.map((x: any) => x.route.key.toString()) : [];

  return (
    <>
      <Menu defaultSelectedKeys={matchedIds} theme="light" selectable>
        {data.communities.map((community) => {
          if (community !== null) {
            return (
              <>
                <Menu.Item
                  key={community.id}
                  onClick={() => {
                    localStorage.setItem('community', community.id);
                    navigate(`/community/${community.id}/admin`);
                  }}
                >
                  {community.name}
                </Menu.Item>
              </>
            );
          }
        })}
      </Menu>
    </>
  );
};
