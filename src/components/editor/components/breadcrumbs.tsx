import { useEditor, useNode } from '@craftjs/core';
import { Breadcrumb, Form, Input, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { arePageLayoutsLoaded, usePageLayouts, getAncestors } from '../page-layout';

interface TextProp {
  separator: string;
}

let Breadcrumbs:any;

Breadcrumbs = ({ separator, ...props } : TextProp) => {
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

  return (
    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
        <div role="listitem" className="cursor-pointer shadow rounded-lg p-8 relative" style={{
          backgroundColor: colorBgContainer,
        }}>
          <Breadcrumb>{
            ancestors.map(
              (x:any) => {
              return (
                <Breadcrumb.Item key={x.id}>
                  <Link to={x.path} style={{color: colorTextBase}}>{x.title}</Link>
                </Breadcrumb.Item>
              ) 
            })
          }</Breadcrumb>
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