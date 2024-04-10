import { useNode } from '@craftjs/core';
import { Breadcrumb, Form, Input, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { arePageLayoutsLoaded, usePageLayouts, getAncestors, LoadedPageLayout } from '../page-layout';

interface BreadcrumbsProps {
  separator: string;
  homePageTitle?: string;
}

const Breadcrumbs = ({ separator, homePageTitle, ...props } : BreadcrumbsProps) => {

  const [pageLayouts] = usePageLayouts();
  if(!arePageLayoutsLoaded(pageLayouts)){
    return <div>Loading...</div>
  }

  const location = useLocation();

  const {
    token: { colorTextBase, colorBgContainer }
  }=theme.useToken();

  const { connectors: {connect,drag} } = useNode((state) =>(
    {
      selected: state.events.selected,
    }
  ));

  const ancestors = getAncestors(pageLayouts, location.pathname);

  const renameHomePageIfNecessary = (ancestors:LoadedPageLayout[]):LoadedPageLayout[] => {
    
    const shouldOverrideHomePageTitle:boolean = (homePageTitle !== null && homePageTitle !== undefined && homePageTitle.length > 0);

    if(ancestors && ancestors.length > 0 && shouldOverrideHomePageTitle){
      const ancestorsCopy = [...ancestors];
      ancestorsCopy[0].title = homePageTitle??'';
      return ancestorsCopy;
    }
    return ancestors;
  }

  const updatedAncestors = renameHomePageIfNecessary(ancestors);

  function itemRender(route:any, _params:any, routes:any, _paths:any) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.title}</span> : <Link className="cursor-pointer" to={route.path} style={{color: colorTextBase}}>{route.title}</Link>;
  }
  return (
    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
    >
      <div role="listitem" className="shadow rounded-lg p-8 relative" style={{
        backgroundColor: colorBgContainer,
      }}>
        <Breadcrumb itemRender={itemRender} items={updatedAncestors} separator={separator} />
      </div>
    </div>
  )
}

const BreadcrumbsSettings = () => {
  const { actions: { setProp }, separator, homePageTitle  } = useNode((node) => ({  
    separator: node.data.props.separator,
    homePageTitle: node.data.props.homePageTitle
  }));
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Separator">
          <Input placeholder="Separator" value={separator} onChange={(inputElement) => setProp((props:any) => props.separator = inputElement.target.value)}  />
        </Form.Item>  
        <Form.Item label="Home Page Title">
          <Input placeholder="HomePageTitle" value={homePageTitle} onChange={(inputElement) => setProp((props:any) => props.homePageTitle = inputElement.target.value)}  />
        </Form.Item>  
      </Form>
    </div>
  )
}

Breadcrumbs.craft = {
  props: {
    separator: '/',
    homePageTitle: ''
  },
  related: {
    settings: BreadcrumbsSettings
  }
}

export {
  Breadcrumbs
};