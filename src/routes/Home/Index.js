import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import { Carousel, List, Card, Progress, Icon } from 'antd';
import { WaterWave } from '../../components/Charts';
import ItemBid from '../../components/ItemBid';
import styles from './index.less';

@connect(({ global, home, loading }) => ({
  global,
  home,
  loading: loading.models.home,
}))
export default class Index extends Component {
  static state = {}
  componentDidMount() {
    this.props.dispatch({
      type: 'home/fetch',
    });
  }
  render() {
    // Carousel api: https://github.com/akiran/react-slick
    const settings = {
      autoplay: true,
      adaptiveHeight: true,
      autoplaySpeed: 3000,
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

    const { global: { isMobile }, home: { list = [] }, loading } = this.props;
    const CarouselList = list[0] ? (
      <div>
        <Carousel {...settings}>
          {
            list[0].carouselList.map(item => (
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

    const card1List = list ? (
      <div>
        <List
          rowKey="id"
          loading={loading}
          split={false}
          header={
            <div className={styles.title}>
              <h4>轻松投</h4>
              <span>已完成投标</span>
            </div>
          }
          grid={{ gutter: 24, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
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
                  <Progress percent={30} status="active" />
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

    const cardList = list[0] ? (
      <div>
        <List
          rowKey="id"
          loading={loading}
          split={false}
          header={
            <div className={styles.header}>
              <div className={styles.title}>
                <h4>{list[0].ItemBidList.title}</h4>
                <span>{list[0].ItemBidList.subhead}</span>
              </div>
              <Link to={list[0].ItemBidList.moreLink} className={styles.more}>
                更多项目 <Icon type="right" />
              </Link>
            </div>
          }
          grid={{ gutter: 24, xl: 4, lg: 2, md: 2, sm: 2, xs: 1 }}
          dataSource={list[0].ItemBidList.children}
          renderItem={item => (
            <List.Item>
              <ItemBid
                links={item.links}
                cover={item.cover}
                title={item.title}
                description={item.description}
                percent={item.percent}
                date={item.date}
                annual={item.annual}
                month={item.month}
              />
            </List.Item>
          )}
        />
      </div>
    ) : null;

    const alreadyList = list ? (
      <div>
        <List
          rowKey="id"
          loading={loading}
          split={false}
          header={
            <div className={styles.title}>
              <h4>轻松投</h4>
              <span>已完成投标</span>
            </div>
          }
          grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <a href="#">
                <Card title={item.title} bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
                  <WaterWave
                    height={161}
                    title="当前墨迹进度"
                    percent={34}
                    color="#f60"
                    contColor="#f60"
                  />
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
          {/* {card1List} */}
        </div>
        <div className={styles.project}>
          {cardList}
        </div>
        <div className={styles.project}>
          {/* {alreadyList} */}
        </div>
      </div>
    );
  }
}
