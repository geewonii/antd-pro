import React from 'react';
import classNames from 'classnames';
import { Card } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

export default function ItemBidColumns({
  className, links, cover, title, tips, bgtop, bgbottom, childrens, ...bidProps
}) {
  const clsString = classNames(className);
  const childrenItem = childrens ? (
    childrens.map((item, i) => <div key={item.id || i}>{item}</div>)
  ) : null;

  return (
    <div className={clsString} {...bidProps}>
      <Link to={links || '/'}>
        <Card
          className={styles.card}
          hoverable
          bodyStyle={{ padding: '0' }}
        >
          <div
            className={styles.wrap}
            style={{
              borderColor: `${bgtop}`,
              backgroundColor: `${bgtop}`,
              backgroundImage: `linear-gradient(to bottom,${bgtop},${bgbottom})`,
            }}
          >
            <div className={styles.side}>
              <div className={styles.fsTitle}>
                <h2>{title}</h2>
                <em>{tips}</em>
              </div>
              {childrenItem}
            </div>
            <img alt={title} src={cover} />
          </div>
        </Card>
      </Link>
    </div>
  );
}
