import { CompassOutlined, FileOutlined, ProfileOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';

import { useNavigate } from 'react-router-dom';
import { PropertiesListing } from '../../shared/pages/properties-listing';
import { PropertiesLocation } from '../../shared/pages/properties-location';
import { SubPageLayout } from '../sub-page-layout';
import { PropertiesGeneral } from './properties-general';
import { Helmet } from 'react-helmet-async';
import { VerticalTabs,RouteDefinition } from '../../../shared/vertical-tabs'; 


export const PropertiesDetail: React.FC<any> = () => {
  const navigate = useNavigate();

  const pages: RouteDefinition[] = [
    {id: "1", link:'', path:'', title:'General', icon:<ProfileOutlined />, element:<PropertiesGeneral />},
    {id: "2", link:'listing', path:'listing/*', title:'Listing', icon:<FileOutlined />, element:<PropertiesListing />},
    {id: "3", link:'location',path:'location/*', title:'Location', icon:<CompassOutlined />, element:<PropertiesLocation />},
  ]

  return (
    <SubPageLayout
      fixedHeader={false}
      header={
        <PageHeader 
          title="Property Detail"
          onBack={() => navigate('../')}
        />}
      >
      <Helmet>
        <title>Property Detail</title>
      </Helmet>

       <VerticalTabs pages={pages} />
    </SubPageLayout>
  )
}