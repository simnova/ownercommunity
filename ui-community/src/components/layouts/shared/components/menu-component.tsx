import { Menu, MenuTheme } from 'antd';
import { MenuMode } from 'rc-menu/lib/interface';
import { Link, generatePath, matchRoutes, useLocation, useParams } from 'react-router-dom';
import { Member } from '../../../../generated';

const { SubMenu } = Menu;

export interface PageLayoutProps {
  path: string;
  title: string;
  icon: React.JSX.Element;
  id: string | number;
  parent?: string;
}
interface TextProp {
  pageLayouts: PageLayoutProps[];
  theme: MenuTheme | undefined;
  mode: MenuMode | undefined;
  memberData?: Member;
}

export const MenuComponent = ({ pageLayouts, ...props }: TextProp) => {
  const params = useParams();
  const location = useLocation();

  const createPath = (path: string): string => {
    return generatePath(path.replace('*', ''), params);
  };

  const buildMenu = (parentId: string) => {
    const children = pageLayouts.filter((x: any) => x.parent === parentId);
    if (!children) {
      return;
    }
    return children.map((x: any) => {
      let child = pageLayouts.find((y: any) => y.id === x.id) as any;
      let grandChildren = pageLayouts.filter((x: any) => x.parent === child.id);
      if (props.memberData && !child.hasPermissions(props.memberData)) {
        return <></>;
      }
      return grandChildren && grandChildren.length > 0 ? (
        <SubMenu key={child.id} title={child.title}>
          <Menu.Item key={`${child.id}-link`} icon={child.icon}>
            <Link to={createPath(child.path)}>{child.title}</Link>
          </Menu.Item>
          {buildMenu(child.id)}
        </SubMenu>
      ) : (
        <Menu.Item key={child.id} icon={child.icon}>
          <Link to={createPath(child.path)}>{child.title}</Link>
        </Menu.Item>
      );
    });
  };

  const topMenu = () => {
    const root = pageLayouts.find((x: any) => x.id === 'ROOT') as any;
    const matchedPages = matchRoutes(pageLayouts as any, location);
    const matchedIds = matchedPages ? matchedPages.map((x: any) => x.route.id.toString()) : [];
    console.log(matchedPages)
    return (
      <Menu theme={props.theme} mode={props.mode} defaultSelectedKeys={matchedIds} selectedKeys={matchedIds}>
        <Menu.Item key="ROOT" icon={root.icon}>
          <Link to={createPath(root.path)}>{root.title}</Link>
        </Menu.Item>
        {buildMenu(root.id)}
      </Menu>
    );
  };

  return topMenu();
};
