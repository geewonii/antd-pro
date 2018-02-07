import React from 'react';
import classNames from 'classnames';
import { Card, Progress, Tooltip } from 'antd';
import { Link } from 'dva/router';
import monent from 'moment';
import styles from './index.less';

export default function ItemBid({
  className, links, cover, title, description, annual, month, num1, num2, date, ...bidProps
}) {
  const clsString = classNames(className);

  const content = Array.isArray(description) ? (
    <div className={styles.description}>
      {
        description.map((item) => {
          return (
            <Tooltip key={item.id} placement="topLeft" title={item.tips}>
              <span>{item.text || '等额本息'}</span>
            </Tooltip>
          );
        })
      }
    </div>
  ) : description;

  const molecular = num1 ? parseFloat(num1).toFixed(2) : 0;
  const denominator = num2 ? parseFloat(num2).toFixed(2) : num1;
  const percent = ((molecular / denominator) * 100).toFixed(1);
  const percentDom = (num1 / num2) !== '100.0' ? (
    <div className={styles.progress}>
      <div>{molecular}万 / {denominator}万</div>
      <span>{monent(date).fromNow() || monent().fromNow()}</span>
    </div>
  ) : '融资完成';

  return (
    <div className={clsString} {...bidProps}>
      <Link to={links || '/'}>
        <Card
          className={styles.card}
          hoverable
          cover={(cover && cover.trim() && <img alt={title} src={cover} height={154} />) || null}
        >
          <Card.Meta
            className={styles.meta}
            title={title}
            description={content}
          />
          <Progress percent={parseFloat(percent) || 0} />
          {percentDom}
          <div className={styles.cardBottom}>
            <div className={styles.cardChild}>
              <div>{annual || 0}%</div>
              <span>约定利率(年化)</span>
            </div>
            <div className={styles.cardChild}>
              <div>{month || 24}</div>
              <span>投资期限(月)</span>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
