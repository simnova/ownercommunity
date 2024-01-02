import { useEditor, useNode } from "@craftjs/core";
import { Breadcrumb, Form, Input, theme } from "antd";
import { Link, useLocation } from 'react-router-dom';
import { usePageLayouts } from "../local-data";

interface TextProp {
  separator: string;
}

let Breadcrumbs:any;

Breadcrumbs = ({ separator, ...props } : TextProp) => {
  const {
    token: { colorTextBase, colorBgContainer }
  }=theme.useToken();
  const [pageLayouts] = usePageLayouts();
  const { connectors: {connect,drag} } = useNode((state) =>(
    {
      selected: state.events.selected,
    }
  ));

  useEditor((state) => ({
    enabled: state.options.enabled
  }));
  console.log('xxx',pageLayouts);
  const location = useLocation();
  if(!pageLayouts || typeof pageLayouts === 'undefined') return <div>Loading...</div>
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const parentPage = pathSnippets.length > 1 ? pageLayouts.find((x:any) => x.path === '/' + pathSnippets[pathSnippets.length-2]) as any : '';
  const listingPagePath = parentPage?.pageType === 'Listing' ? pageLayouts.find((x:any) => x.id === parentPage?.id)?.path : '';
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    if (listingPagePath !== '' && url.slice(listingPagePath.length).length > 0) {
      const pageTitle = pageLayouts.find((x:any) => x.parent === parentPage.id)?.title as any;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{pageTitle}</Link>
        </Breadcrumb.Item>
      )
    }
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{pageLayouts.find((x:any) => x.path === url)?.title}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/" style={{
        color: colorTextBase,
      }}>Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return (
    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
        <div role="listitem" className="cursor-pointer shadow rounded-lg p-8 relative" style={{
          backgroundColor: colorBgContainer,
        }}>
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
    </div>
  )
}


var BreadcrumbsSettings = () => {
  const { actions: { setProp}, separator  } = useNode((node) => ({  
    separator: node.data.props.separator
  }));
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Separator">
          <Input placeholder="Separator" value={separator} onChange={(inputElement) => setProp((props:any) => props.title = inputElement.target.value)}  />
        </Form.Item>  
      </Form>
    </div>
  )
}

Breadcrumbs.craft = {
  props: {
    separator: '/',
  },
  related: {
    settings: BreadcrumbsSettings
  }

}

export {
  Breadcrumbs
};
