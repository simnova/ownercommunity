import { Col, Menu, Row } from 'antd';
import { Link, Route, RouteObject, Routes, matchRoutes, useLocation, useResolvedPath } from 'react-router-dom';


export interface RouteDefinition {
  id: string;
  link:string;
  path: string;
  title: string;
  icon: React.ReactNode;
  element: React.ReactNode;
}

export const VerticalTabs: React.FC<{pages: RouteDefinition[]}> = ({pages}) => {
  const location = useLocation();
  const convertedRoutes = pages.map((x) => {return {id: x.id, path:useResolvedPath(x.path).pathname} as RouteObject} )
  const matchedPages = matchRoutes(convertedRoutes,location)
  const matchedIds = matchedPages ? matchedPages.map((x:any) => x.route.id.toString()) : [];

  return (
    <Row wrap={false}>
      <Col flex="none">
      <Menu mode="inline" selectedKeys={matchedIds}>
        {
        pages.map((page) => (
          <Menu.Item key={page.id} icon={page.icon}>
            <Link to={page.link}>{page.title}</Link>
          </Menu.Item>
        ))
        }
      </Menu>
      </Col>
      <Col flex="auto" style={{paddingLeft:'24px'}}>
        <Routes>
          {pages.map((page) => (
            <Route key={page.id} path={page.path} element={page.element} />
          ))}
        </Routes>
      </Col>
    </Row>
  );
}