import React from 'react';
import './section-layout.css';

import { MasterLayout } from '../../ui/organisms/master-layout/master-layout';
import { PageLayoutProps } from '.';

interface AdminSectionLayoutProps {
  pageLayouts: PageLayoutProps[];
}

export const SectionLayout: React.FC<AdminSectionLayoutProps> = (props) => {
  return (
    <MasterLayout hasHeaderDropdownMenu={true} hasSidebar={true} pageLayouts={props.pageLayouts} />
  );
};
