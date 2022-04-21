import React, { FC, useState } from 'react';
import { useQuery } from "@apollo/client";
import { AdminCommunityMenuContainerCommunitiesQueryDocument } from '../../../../generated';
import PropTypes, { InferProps } from 'prop-types';


import {  Menu } from 'antd';
import { Link , useLocation, matchRoutes} from 'react-router-dom';

const ComponentPropTypes = {
  itemSelected: PropTypes.func
}

export interface ComponentProp {
  itemSelected: (id:string) => void
}

export type ComponentProps = InferProps<typeof ComponentPropTypes> & ComponentProp;

export const CommunityMenu: FC<any> = ({itemSelected}) => {
  const location =  useLocation();

  const { loading, error, data} = useQuery(AdminCommunityMenuContainerCommunitiesQueryDocument,{
    variables: {
    }
  })
  
  if(error){
    return <>
      <div>Error :( {JSON.stringify(error)}</div>
    </>
  } 

  if(loading){
    return <>
      <div>Loading...</div>
    </>
  } 

  if (typeof data === 'undefined' || typeof data.communities === 'undefined' || data.communities === null ) {
    return <>
      <div>No Data...</div>
    </>
  }
  
  var menuPages = data.communities.map((community) => {
    return {
      key: community?.id,
      name: community?.name,
      path: `/community/${community?.id}/admin`,
    }
  });
  const matchedPages =  matchRoutes(menuPages,location);
  const matchedIds = matchedPages ? matchedPages.map((x:any) => x.route.key.toString()) : [];

  return <>
    <Menu
        defaultSelectedKeys={matchedIds}
        theme="light"
      >
    {
      data.communities.map((community) => {
        if (community !== null) {
          return <>
          <Menu.Item key={community.id}>
            <Link to={`/community/${community.id}/admin`}>{community.name}</Link>
          </Menu.Item>
        </>
        }
      })
    }
    </Menu> 
  </>

}