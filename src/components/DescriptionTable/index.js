import React from 'react';
import classNames from 'classnames';
import { Table } from 'antd';
// import { Link } from 'dva/router';
// import monent from 'moment';
// import styles from './index.less';

export default function DescriptionTable({
  className, columns, dataSource, ...bidProps
}) {
  const clsString = classNames(className);
  return (
    <div className={clsString} {...bidProps}>
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 820 }} />
    </div>
  );
}
