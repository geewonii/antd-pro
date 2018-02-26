import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Row, Col, Progress, Input } from 'antd';
import styles from './index.less';
import CountDownMore from '../../components/CountDownMore';

@connect(({ global, credit, loading }) => ({
  global,
  credit,
  loading: loading.models.credit,
}))
export default class Index extends PureComponent {
  static state = {}
  componentDidMount() {
    this.props.dispatch({
      type: 'credit/fetch',
      payload: {
        key: 'plc',
      },
    });
  }

  onEnd = () => {
    // do something
  }

  render() {
    const { credit: { list = [] }, loading } = this.props;
    let data = null;
    if (list.getCreditData) {
      [data] = [...list.getCreditData];
    }
    const headDom = data ? (
      <div className={styles.head}>
        <div className={styles.title}>
          <div className={styles.titleLeft}>
            <h2>{data.title}</h2>
            <span>{data.business}</span>
          </div>
          <div className={styles.titleRight}>
            <Link to={data.deal.links}>{data.deal.text}</Link>
          </div>
        </div>
        <div className={styles.earnings}>
          {
            data.earnings && data.earnings.map((item) => {
              return (
                <div className={styles.earningsItem} key={item.id}>
                  <div>{item.title}</div>
                  <span>{item.tips}</span>
                </div>
              );
            })
          }
        </div>
        <div className={styles.progress}>
          <font>投资进度：</font>
          <Progress percent={parseFloat(data.progress) || 0} />
        </div>
        <div className={styles.explain}>
          {
            data.explain && data.explain.map((item) => {
              return <div key={item.id}>{item.title}</div>;
            })
          }
        </div>
      </div>
    ) : null;

    const content = data ? (
      <div>
        <Row>
          <Col lg={16} md={0} sm={0} xs={0} style={{ paddingRight: '20px' }}>
            <Card bodyStyle={{ padding: '0' }} loading={loading}>
              {headDom}
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card loading={loading}>
              <Row>
                <Col lg={0} md={24}>
                  {headDom}
                </Col>
              </Row>
              <CountDownMore
                stop={new Date(data.countdown)}
                size={36}
                onEnd={this.onEnd}
              />
              <div className={styles.residue}>
                剩余金额：<span>{parseFloat(data.residue).toFixed(2)}元</span>
              </div>
              <div className={styles.residue}>
                <Input size="large" placeholder="起投金额1000元" style={{ width: '300px' }} />
              </div>
              <div className={styles.totalRevenue}>
                预计总收益<span>{`${data.qq}`}</span>元
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    ) : null;

    return (
      <div className={styles.credit}>
        <div className={styles.nav}>
          <img src={data ? data.nav.navUrl : 'https://www.phonelee.com/Credit/NewCunQian/4219'} alt={data ? data.title : ''} />
          <div>投资有风险，理财需谨慎，点击查看 <Link to={data ? data.nav.links : '/'}>过往产品</Link></div>
        </div>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    );
  }
}
