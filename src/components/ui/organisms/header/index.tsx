import React from 'react';
import PropTypes from 'prop-types';
import { LoggedInUserContainer } from './logged-in-user.container';
import styles from './index.module.css';

const ComponentProps = {
  autoLogin: PropTypes.bool.isRequired
};

interface ComponentPropInterface {
  autoLogin: boolean;
}

export type OwnerCommunityPropTypes = PropTypes.InferProps<typeof ComponentProps> &
  ComponentPropInterface;

export const OwnerCommunityHeader: React.FC<OwnerCommunityPropTypes> = (props) => {
  return (
    <>
      <div className={styles['top-bar']}>
        <LoggedInUserContainer autoLogin={props.autoLogin} />
      </div>
    </>
  );
};
