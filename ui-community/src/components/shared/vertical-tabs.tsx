import { Col, Menu, Row, theme } from 'antd';
import { Link, Route, RouteObject, Routes, matchRoutes, useLocation, useResolvedPath } from 'react-router-dom';
import { useMemo } from 'react';


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
  const convertedRoutes = useMemo(() => {
    return pages.map((x) => {
      return { id: x.id, path: useResolvedPath(x.path).pathname} as RouteObject ;
    });
  }, [pages]);
  const matchedPages = matchRoutes(convertedRoutes,location)
  const matchedIds = matchedPages ? matchedPages.map((x:any) => x.route.id.toString()) : [];

  const {
    token: { colorTextBase }
  } = theme.useToken();

  return (
    <Row wrap={false}  style={{
      color: colorTextBase
    }}>
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