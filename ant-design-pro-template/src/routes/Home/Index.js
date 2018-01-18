import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd';

import styles from './index.less';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Index extends Component {
  state = {};
  render() {
    return (
      <div>
        <Carousel autoplay>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
      </div>
    );
  }
}
