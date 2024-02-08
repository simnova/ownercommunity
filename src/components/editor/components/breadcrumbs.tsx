import { useEditor, useNode } from '@craftjs/core';
import { Breadcrumb, Form, Input, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { arePageLayoutsLoaded, usePageLayouts, getAncestors, LoadedPageLayout } from '../page-layout';

interface TextProp {
  separator: string;
  homePageTitle?: string;
}

const Breadcrumbs = ({ separator,homePageTitle, ...props } : TextProp) => {
  const {
    token: { colorTextBase, colorBgContainer }
  }=theme.useToken();

  const [pageLayouts] = usePageLayouts();


  useEditor((state) => ({
    enabled: state.options.enabled
  }));

  const location = useLocation();

  if(!arePageLayoutsLoaded(pageLayouts)){
    return <div>Loading...</div>
  }

  const { connectors: {connect,drag} } = useNode((state) =>(
    {
      selected: state.events.selected,
    }
  ));

  const ancestors = getAncestors(pageLayouts, location.pathname);

  const getTitle = (x:LoadedPageLayout, index:number) => {
    const isHomePage:boolean = index === 0;
    const shouldOverrideHomePageTitle:boolean = (homePageTitle !== null && homePageTitle !== undefined && homePageTitle.length > 0);

    if(isHomePage && shouldOverrideHomePageTitle){
      return homePageTitle;
    }
    return x.title;
  }

  return (
    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
        <div role="listitem" className="cursor-pointer shadow rounded-lg p-8 relative" style={{
          backgroundColor: colorBgContainer,
        }}>
          <Breadcrumb separator={separator}>{
            ancestors.map(
              (x:LoadedPageLayout, index:number) => {
              return (
                <Breadcrumb.Item key={x.id}>
                  <Link to={x.path} style={{color: colorTextBase}}>{ getTitle(x,index)}</Link>
                </Breadcrumb.Item>
              ) 
            })
          }</Breadcrumb>
        </div>
    </div>
  )
}

const BreadcrumbsSettings = () => {
  const { actions: { setProp}, separator, homePageTitle  } = useNode((node) => ({  
    separator: node.data.props.separator,
    homePageTitle: node.data.props.homePageTitle
  }));
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Separator">
          <Input placeholder="Separator" value={separator} onChange={(inputElement) => setProp((props:any) => props.title = inputElement.target.value)}  />
        </Form.Item>  
        <Form.Item label="Home Page Title">
          <Input placeholder="HomePageTitle" value={homePageTitle} onChange={(inputElement) => setProp((props:any) => props.title = inputElement.target.value)}  />
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