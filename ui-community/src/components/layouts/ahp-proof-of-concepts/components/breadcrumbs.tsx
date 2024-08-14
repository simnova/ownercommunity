// Breadcrumbs.tsx
import type { MenuProps } from 'antd';
import { Breadcrumb, Dropdown } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbNameMap: { [key: string]: string | undefined } = {
    ["ahp-proof-of-concepts"]: 'AHP Proof of Concepts',
    ["cases"]: 'Cases',
    ["settings"]: 'Settings',
    ["active"]: 'Active',
    ["archived"]: 'Archived',
    ["application"]: 'Application',
    ["chat"]: 'Chat',
    ["files"]: 'Files',
    ["transactions"]: 'Transactions'
  };

  const caseStatusDropdownMenuItems: MenuProps['items'] = [
    {
      key: `active`,
      label: <Link to={`cases/acive`}>Active</Link>
    },
    {
      key: `archived`,
      label: <Link to={`cases/archived`}>Archived</Link>
    }
  ];

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    if ([`active`, `archived`].includes(snippet)) {
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
