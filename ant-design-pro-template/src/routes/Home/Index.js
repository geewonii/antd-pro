import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Index extends Component {
  state = {};
  render() {
    return (
      <div>hello world！</div>
    );
  }
}
