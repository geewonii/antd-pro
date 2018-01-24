import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import { Carousel, List, Card } from 'antd';

import styles from './index.less';

@connect(({ isMobile, list, loading }) => ({
  isMobile,
  list,
  loading: loading.models.list,
}))
export default class Index extends Component {
  static state = {}
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch({
      type: 'list/fetch',
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

    const carouselData = [
      {
        id: '1',
        title: '1',
        links: '/',
        imgPC: 'https://dn-miracle-photo.qbox.me/1d6823c3-f706-4554-8824-7584a7e0b84b',
        imgMobile: 'https://dn-miracle-photo.qbox.me/1d6823c3-f706-4554-8824-7584a7e0b84b',
      },
      {
        id: '2',
        title: '2',
        links: '/home',
        imgPC: 'https://dn-miracle-photo.qbox.me/838c9dfa-eeed-4b10-977e-ac4bf4ed8dab',
        imgMobile: 'https://dn-miracle-photo.qbox.me/838c9dfa-eeed-4b10-977e-ac4bf4ed8dab',
      },
      {
        id: '3',
        title: '3',
        links: '/home',
        imgPC: 'https://dn-miracle-photo.qbox.me/18be680c-7f6c-4edd-b528-7f74737ef3d9',
        imgMobile: 'https://dn-miracle-photo.qbox.me/18be680c-7f6c-4edd-b528-7f74737ef3d9',
      },
    ];

    const { list: { list = [] }, loading } = this.props;

    const cardList = list ? (
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
    ) : null;

    return (
      <div className={styles.carousels}>
        <Carousel {...settings}>
          {
            carouselData.map(item => (
              <div key={item.id}>
                <Link to={item.links}>
                  <img src={this.props.isMobile ? item.imgMobile : item.imgPC} alt={item.title} />
                </Link>
              </div>
            ))
          }
        </Carousel>
        <div className={styles.project}>
          <div>
            <div className={styles.title}>
              <h4>轻松投</h4>
              <span>自动投标工具，资金不放假，理财有规划</span>
            </div>
            {cardList}
          </div>
        </div>
      </div>
    );
  }
}
