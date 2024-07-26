// Breadcrumbs.tsx
import type { MenuProps } from 'antd';
import { Breadcrumb, Dropdown } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AHPObjectRouteLayer, AHPRootRouteLayer } from '..';
import { AHPObjectStatusRouteLayer } from '../pages/request-list-page';
import { AHPActiveCaseDetailsLayer } from '../pages/request-list-page/case-details-page/active-case-details-page';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbNameMap: { [key: string]: string | undefined } = {
    [AHPRootRouteLayer]: 'AHP Proof of Concepts',
    [AHPObjectRouteLayer.Cases]: 'Cases',
    [AHPObjectRouteLayer.Settings]: 'Settings',
    [AHPObjectStatusRouteLayer.Active]: 'Active',
    [AHPObjectStatusRouteLayer.Archived]: 'Archived',
    [AHPActiveCaseDetailsLayer.Application]: 'Application',
    [AHPActiveCaseDetailsLayer.Chat]: 'Chat',
    [AHPActiveCaseDetailsLayer.Files]: 'Files',
    [AHPActiveCaseDetailsLayer.Transactions]: 'Transactions'
  };

  const caseStatusDropdownMenuItems: MenuProps['items'] = [
    {
      key: `${AHPObjectStatusRouteLayer.Active}`,
      label: <Link to={`${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Active}`}>Active</Link>
    },
    {
      key: `${AHPObjectStatusRouteLayer.Archived}`,
      label: <Link to={`${AHPObjectRouteLayer.Cases}/${AHPObjectStatusRouteLayer.Archived}`}>Archived</Link>
    }
  ];

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    if ([`${AHPObjectStatusRouteLayer.Active}`, `${AHPObjectStatusRouteLayer.Archived}`].includes(snippet)) {
      return (
        <Breadcrumb.Item key={url}>
          <Dropdown menu={{ items: caseStatusDropdownMenuItems }} placement="bottomLeft">
            <Link to={url}>{breadcrumbNameMap[snippet]}</Link>
          </Dropdown>
        </Breadcrumb.Item>
      );
    }

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[snippet] || snippet}</Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>;
};

export default Breadcrumbs;
