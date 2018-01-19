import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel } from 'antd';

import styles from './index.less';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Index extends Component {
  state = {};
  render() {
    // Carousel api: https://github.com/akiran/react-slick
    const settings = {
      autoplay: true,
      adaptiveHeight: true,
      autoplaySpeed: 3000,
      speed: 300,
      slidesToShow: 1,
      lazyLoad: true,
      // slide: 'div',
      // vertical: true,
      // dots: true,
      // dotsClass: 'slick-dots',
      // fade: false,
      // focusOnSelect: true,
      // pauseOnHover: true,
      // rtl: true,
      // centerMode: true,
    };
    console.log(this.props);
    return (
      <div className={styles.carousels}>
        <Carousel {...settings} >
          <div>
            <Link to="/">
              <img src="http://media.phonelee.com/site_ad/fuzzy_graph/150_6zc88.png" alt="" />
            </Link>
          </div>
          <div>
            <Link to="/">
              <img src="http://media.phonelee.com/site_ad/fuzzy_graph/158_ltzwa.png" alt="" />
            </Link>
          </div>
        </Carousel>
      </div>
    );
  }
}
