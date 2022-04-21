import {useNode,useEditor} from "@craftjs/core";
import { Button, Input, Form} from "antd";
import ListBody from "antd/lib/transfer/ListBody";
import ContentEditable from 'react-contenteditable'
import { HashRouter, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';
import {usePageLayouts} from "../local-data";

interface TextProp {
  separator: string;
}

let Breadcrumbs:any;

Breadcrumbs = ({ separator, ...props } : TextProp) => {
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  const { connectors: {connect,drag}, selected, actions } = useNode((state) =>(
    {
      selected: state.events.selected,
    
    }
  ));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));
  console.log('xxx',pageLayouts);
  const location = useLocation();
  if(!pageLayouts || typeof pageLayouts === 'undefined') return <div>Loading...</div>
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{pageLayouts.find((x:any) => x.path === url).title}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return (

    



    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
        <div role="listitem" className="bg-white cursor-pointer shadow rounded-lg p-8 relative z-30">
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

export  {
  Breadcrumbs
}
