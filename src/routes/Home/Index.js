import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel, List, Icon, Card } from 'antd';
// import { WaterWave } from '../../components/Charts';
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
    const { global: { isMobile }, home: { list = [] }, loading } = this.props;

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

    const ItemNoticeHeader = (todo) => {
      return (
        <div className={styles.header}>
          <div className={styles.title}>
            <font>{todo.title}</font>
            <Link to={todo.moreLink || '/'} className={styles.more}>
              <span><Icon type="notification" /> {todo.subhead}</span>
            </Link>
          </div>
        </div>
      );
    };

    const ItemBidHeader = (todo) => {
      return (
        <div className={styles.header}>
          <div className={styles.title}>
            <h4>{todo.title}</h4>
            <span>{todo.subhead}</span>
          </div>
          <Link to={todo.moreLink || '/'} className={styles.more}>
            更多项目 <Icon type="right" />
          </Link>
        </div>
      );
    };

    const ItemNotice = list[0] ? (
      <div className={styles.project}>
        <Card
          title={ItemNoticeHeader(list[0].ItemNoticeList)}
          loading={loading}
          extra={<Link to="/" className={styles.more}>更多公告 <Icon type="right" /></Link>}
        >
          <List
            dataSource={list[0].ItemNoticeList.children}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={null}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    ) : null;

    const ItemBidList = list[0] ? (
      <div>
        {
          list[0].ItemBidList.map((todo) => {
            return (
              <div key={todo.parentId} className={styles.project}>
                <List
                  rowKey="id"
                  loading={loading}
                  split={false}
                  header={ItemBidHeader(todo)}
                  grid={{ gutter: 24, xl: 4, lg: 2, md: 2, sm: 2, xs: 1 }}
                  dataSource={todo.children}
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
                        num1={item.num1}
                        num2={item.num2}
                      />
                    </List.Item>
                  )}
                />
              </div>
            );
          })
        }
      </div>
    ) : null;

    // const alreadyList = list ? (
    //   <div>
    //     <List
    //       rowKey="id"
    //       loading={loading}
    //       split={false}
    //       header={
    //         <div className={styles.title}>
    //           <h4>轻松投</h4>
    //           <span>已完成投标</span>
    //         </div>
    //       }
    //       grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
    //       dataSource={list}
    //       renderItem={item => (
    //         <List.Item>
    //           <a href="#">
    // <Card title={item.title} bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
    //               <WaterWave
    //                 height={161}
    //                 title="当前墨迹进度"
    //                 percent={34}
    //                 color="#f60"
    //                 contColor="#f60"
    //               />
    //             </Card>
    //           </a>
    //         </List.Item>
    //       )}
    //     />
    //   </div>
    // ) : null;

    return (
      <div className={styles.carousels}>
        {CarouselList}
        {ItemNotice}
        {ItemBidList}
      </div>
    );
  }
}
