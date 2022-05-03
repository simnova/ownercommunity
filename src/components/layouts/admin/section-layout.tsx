import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Dropdown, Layout } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './section-layout.css';

import { MenuComponent } from './components/menu-component';
import { Header } from 'antd/lib/layout/layout';
import { LoggedInUserContainer } from '../../ui/organisms/header/logged-in-user-container';
import { CommunityMenu } from './components/community-menu';
import { handleToggler, LocalSettingsKeys } from '../../../constants';

const { Footer, Sider } = Layout;

export const SectionLayout: React.FC<any> = (props) => {

  const params = useParams();

  const sidebarCollapsed = localStorage.getItem(LocalSettingsKeys.SidebarCollapsed);
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);
  
  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <Header>
   
        <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', gap:'10px' }}>

          <div style={{display:'flex' }} className="allowBoxShadow">
            <Dropdown overlay={<CommunityMenu/>} placement="bottomLeft" >
              <a className="ant-dropdown-link" style={{minHeight:'50px'}} href="#">
                Communities <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <a className='allowBoxShadow' onClick={() => window.location.href = `/community/${params.communityId}/members`}>View Member Site</a>
       
          <div className='text-right bg-black text-sky-400' style={{flexGrow:'1'}}>
            <LoggedInUserContainer autoLogin={true} />
          </div>
        </div>
        
      </Header>
      <Layout hasSider>
        <Sider
          theme='light'
          className='site-layout-background'
          collapsible
          collapsed={!isExpanded}
          onCollapse={() => handleToggler(isExpanded, setIsExpanded)}
          style={{
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
            position: 'relative',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
        <div className="logo" />

        <MenuComponent pageLayouts={props.pageLayouts}  theme="light" mode="inline" />
      </Sider>
      
      <Layout style={{display:'flex',flexDirection:'column',flex:'1 auto', overflowY:'scroll', height:'calc(100vh - 64px)'}}>
        <Outlet/>
      </Layout>
    </Layout>
  </Layout>  
  )
}