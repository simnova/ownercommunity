import React, { FC, useState} from 'react';
import { useQuery } from "@apollo/client";
import { AdminCommunityMenuContainerCommunitiesQueryDocument } from '../../../../generated';
import PropTypes, { InferProps } from 'prop-types';


import { Menu, Spin } from 'antd';
import { useLocation, matchRoutes} from 'react-router-dom';

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
      <div style={{backgroundColor: "white"}}><Spin /> Loading... </div>
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
      path: `/community/${community?.id}/members`,
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
            <div onClick={ () => window.location.href = `/community/${community.id}/members`}>{community.name}</div>
          </Menu.Item>
        </>
        }
      })
    }
    </Menu> 
  </>

}