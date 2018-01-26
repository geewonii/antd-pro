import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import { Carousel, List, Card } from 'antd';

import styles from './index.less';

@connect(({ isMobile, home, loading }) => ({
  isMobile,
  home,
  loading: loading.models.home,
}))
export default class Index extends Component {
  static state = {}
  componentDidMount() {
    this.props.dispatch({
      type: 'home/fetch',
      payload: {
        count: 8,
      },
    });
  }
  render() {
    // Carousel api: https://github.com/akiran/react-slick
    const settings = {
      autoplay: true,
      adaptiveHeight: true,
      autoplaySpeed: 5000,
      speed: 300,
      slidesToShow: 1,
      // lazyLoad: true,
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

    const { isMobile, home: { carouselData, list = [] }, loading } = this.props;
    const CarouselList = carouselData ? (
      <div>
        <Carousel {...settings}>
          {
            carouselData.map(item => (
              <div key={item.id}>
                <Link to={item.links}>
                  <img src={isMobile ? item.imgMobile : item.imgPC} alt={item.title} />
                </Link>
              </div>
            ))
          }
        </Carousel>
      </div>
    ) : null;

    const cardList = list ? (
      <div>
        <div className={styles.title}>
          <h4>轻松投</h4>
          <span>自动投标工具，资金不放假，理财有规划</span>
        </div>
        <List
          rowKey="id"
          loading={loading}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <a href="#">
                <Card
                  className={styles.card}
                  hoverable
                  cover={<img alt={item.title} src={item.cover} height={154} />}
                >
                  <Card.Meta
                    title={item.title}
                    description={item.subDescription}
                  />
                  <div className={styles.cardItemContent}>
                    <span>{moment(item.updatedAt).fromNow()}</span>
                    <div className={styles.right}>自动投标</div>
                  </div>
                </Card>
              </a>
            </List.Item>
          )}
        />
      </div>
    ) : null;

    return (
      <div className={styles.carousels}>
        {CarouselList}
        <div className={styles.project}>
          {cardList}
        </div>
      </div>
    );
  }
}
