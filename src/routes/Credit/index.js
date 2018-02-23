import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Row, Col } from 'antd';
import styles from './index.less';

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
            <Col lg={15}>
              <Card>
                d
              </Card>
            </Col>
            <Col lg={8} offset={1}>
              <Card>
                d
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
