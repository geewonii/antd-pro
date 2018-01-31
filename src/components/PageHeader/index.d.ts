import * as React from 'react';
export interface PageHeaderProps {
  title?: React.ReactNode | string;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  routes?: Array<any>;
  params?: any;
  breadcrumbList?: Array<{ title: React.ReactNode; href?: string }>;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  tabActiveKey?: string;
  onTabChange?: (key: string) => void;
<<<<<<< HEAD
=======
  tabBarExtraContent?: React.ReactNode;
>>>>>>> upstream/master
  linkElement?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class PageHeader extends React.Component<PageHeaderProps, any> {}
