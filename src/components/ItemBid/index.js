import React from 'react';
import classNames from 'classnames';
import { Card, Progress, Tooltip } from 'antd';
import { Link } from 'dva/router';
// import moment from 'moment';
import styles from './index.less';

export default function ItemBid({
  className, links, cover, title, description, percent, annual, month, ...bidProps
}) {
  const clsString = classNames(className);
  const content = Array.isArray(description) ? (
    <div className={styles.description}>
      {
        description.map((item) => {
          return (
            <Tooltip key={item.id} placement="topLeft" title={item.tips}>
              <span>{item.text}</span>
            </Tooltip>
          );
        })
      }
    </div>
  ) : description;
  return (
    <div className={clsString} {...bidProps}>
      <Link to={links || '/'}>
        <Card
          className={styles.card}
          hoverable
          cover={(cover && <img alt={title} src={cover} height={154} />) || null}
        >
          <Card.Meta
            className={styles.meta}
            title={title}
            description={content}
          />
          <div>
            
            <Progress percent={parseFloat(percent) || 0} />
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.cardChild}>
              <div>{annual || 0}%</div>
              <span>约定利率(年化)</span>
            </div>
            <div className={styles.cardChild}>
              <div>{month || 24}</div>
              <span>项目期限(月)</span>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
