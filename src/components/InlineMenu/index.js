import React from 'react';
import SiderMenu from './SiderMenu';

export default props => (
  props.isMobile ? (
    <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
  ) : <SiderMenu {...props} />
);
