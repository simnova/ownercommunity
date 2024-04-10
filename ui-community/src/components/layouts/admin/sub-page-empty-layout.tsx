import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React from "react";


const { Header, Content, Footer } = Layout;

const ComponentPropTypes = {
  header: PropTypes.object.isRequired,
  fixedHeader: PropTypes.bool,
  children: PropTypes.node
};

interface ComponentPropInterface {
  header: React.JSX.Element;
  fixedHeader?: boolean;
  children?: React.ReactNode;
}

export type SubPageEmptyLayoutPropTypes = PropTypes.InferProps<typeof ComponentPropTypes> & ComponentPropInterface;

export const SubPageEmptyLayout: React.FC<SubPageEmptyLayoutPropTypes> = (props) => {
  const overFlow = props.fixedHeader ? 'scroll' : 'unset';
  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0, height: 'fit-content' }}>
        {props.header}
      </Header>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1 auto', overflowY: overFlow }}>
        <Content style={{ margin: '24px 16px 0', minHeight: 'inherit' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>Owner Community</Footer>
      </div>
    </>
  );
};
