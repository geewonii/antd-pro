import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Row, Col } from 'antd';
import moment from 'moment';
import styles from './index.less';
import CountDownMore from '../../components/CountDownMore';

@connect(({ global, credit, loading }) => ({
  global,
  credit,
  loading: loading.models.credit,
}))
export default class Index extends Component {
  static state = {}
  componentDidMount() {
    this.props.dispatch({
      type: 'credit/fetch',
    });
  }
  render() {
    // const { global: { isMobile }, credit: { list = [] }, loading } = this.props;

    return (
      <div className={styles.credit}>
        <div className={styles.nav}>
          <img src="https://www.phonelee.com/Content/new/newimages/security.jpg" alt="" />
          <div>投资有风险，理财需谨慎，点击查看 <Link to="/">过往产品</Link></div>
        </div>
        <div className={styles.content}>
          <Row>
            <Col lg={16} style={{ paddingRight: '20px' }}>
              <Card>
                d
              </Card>
            </Col>
            <Col lg={8}>
              <Card>
                <CountDownMore
                  stop={new Date(moment().add('1', 'days').format('YYYY/MM/DD HH:mm:ss'))}
                  size={36}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
