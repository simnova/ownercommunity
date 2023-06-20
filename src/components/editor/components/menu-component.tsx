import {useNode,useEditor} from "@craftjs/core";
import { Button, Input, Form} from "antd";
import ListBody from "antd/lib/transfer/ListBody";
import ContentEditable from 'react-contenteditable'
import { HashRouter, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Alert, theme as antdTheme } from 'antd';
import {usePageLayouts} from "../local-data";

import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

interface TextProp {
  theme: string;
}

let MenuComponent:any;

MenuComponent = ({ theme, ...props } : TextProp) => {
  const {
    token: { colorTextBase, colorBgContainer }
  }=antdTheme.useToken();
  const [pageLayouts, setPageLayouts] = usePageLayouts();
  const { connectors: {connect,drag}, selected, actions } = useNode((state) =>(
    {
      selected: state.events.selected,
    
    }
  ));


  const buildMenu = (parentId:string) => {
    const children = pageLayouts.filter((x:any) => x.parent === parentId);
    if(!children) { return; }
    return children.map((x:any) => {
      let child = pageLayouts.find((y:any) => y.id === x.id) as any
      let grandChildren = pageLayouts.filter((x:any) => x.parent === child.id)
      return (
        (grandChildren && grandChildren.length > 0 && child.pageType !== 'Listing' )? 
          <SubMenu key={child.id} title={child.title}>
            <Menu.Item key={`${child.id}-link`}>
              <Link to={child.path}>{child.title}</Link>
            </Menu.Item>
            {buildMenu(child.id)}
          </SubMenu> 
        :  
        <Menu.Item key={child.id}>
          <Link to={child.path}>{child.title}</Link>
        </Menu.Item>
      )
    });
  }
   
  const topMenu = () => {
    const root = pageLayouts.find((x:any) => x.parent === "ROOT") as any;
    
    return (
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">{pageLayouts.find((x:any) => x.parent === "ROOT")?.title}</Link>
        </Menu.Item>
        {buildMenu(root.id)}

      </Menu>
    )
  }
    

  return (
    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
        <div role="listitem" className="cursor-pointer shadow rounded-lg p-8 relative " style={{
          backgroundColor: colorBgContainer,
        }}>
        {topMenu()}

        </div>
      
    </div>
  )
}


var MenuComponentSettings = () => {
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

MenuComponent.craft = {
  props: {
    theme: 'light'
  },
  related: {
    settings: MenuComponentSettings
  }

}

export  {
  MenuComponent
}
