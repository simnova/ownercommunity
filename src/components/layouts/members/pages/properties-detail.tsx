
import { Routes, Route, Link, useLocation, matchRoutes, useNavigate } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-layout';
import { Col, Menu, Row } from 'antd';
import { ProfileOutlined, CompassOutlined, FileOutlined } from '@ant-design/icons';
import React from 'react';
import { PropertiesGeneral } from './properties-general';


import { SubPageLayout } from '../sub-page-layout';
import { PropertiesListing } from '../../shared/pages/properties-listing';
import { PropertiesLocation } from '../../shared/pages/properties-location';


export const PropertiesDetail: React.FC<any> = (_props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pages = [
    {id: "1", path:'community/:communityId/member/:userId/properties/:id/', title:'General', icon:<ProfileOutlined />},
    {id: "2", path:'community/:communityId/member/:userId/properties/:id/listing/*', title:'Listing', icon:<FileOutlined />},
    {id: "3", path:'community/:communityId/member/:userId/properties/:id/location/*', title:'Location', icon:<CompassOutlined />},
  ]

  const matchedPages = matchRoutes(pages,location)
  const matchedIds = matchedPages ? matchedPages.map((x:any) => x.route.id.toString()) : [];

  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Property Detail"
          onBack={() => navigate('../')}
        />}
      >
        <Row wrap={false}>
          <Col flex="none">
          <Menu mode="inline" selectedKeys={matchedIds}>
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="">General</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>
              <Link to="listing">Listing</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CompassOutlined />}>
              <Link to="location">Location</Link>
            </Menu.Item>
          </Menu>
          </Col>
          <Col flex="auto" style={{paddingLeft:'24px'}}>
            <Routes>
              <Route path="" element={<PropertiesGeneral />} />
              <Route path="/listing/*" element={<PropertiesListing />} />
              <Route path="/location/*" element={<PropertiesLocation />} />
            </Routes>
          </Col>
        </Row>
    </SubPageLayout>
  )
}