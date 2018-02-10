import React from 'react';
import classNames from 'classnames';
import { Card } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

export default function ItemBidColumns({
  className, links, cover, title, description, annual, ...bidProps
}) {
  const clsString = classNames(className);
  return (
    <div className={clsString} {...bidProps}>
      <Link to={links || '/'}>
        <Card
          className={styles.card}
          hoverable
          bodyStyle={{ padding: '0', backgroundColor: '#f60' }}
          cover={(cover && cover.trim() && <img alt={title} src={cover} />) || null}
        >
          <div>dd</div>
          <div>dd</div>
        </Card>
      </Link>
    </div>
  );
}
