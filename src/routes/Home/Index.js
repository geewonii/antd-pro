import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel, List, Icon, Card, Avatar, Row, Col } from 'antd';
import { numberFormat } from '../../utils/utils';
// import { WaterWave } from '../../components/Charts';
// import ItemBid from '../../components/ItemBid';
// import ItemBidColumns from '../../components/ItemBidColumns';
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
      type: 'home/homeInfoFetch',
    });
  }
  render() {
    const { global: { isMobile }, home: { list = [] }, loading } = this.props;
    // Carousel api: https://github.com/akiran/react-slick
    const settings = {
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 300,
      slidesToShow: 1,
      lazyLoad: true,
      slide: 'div',
      // adaptiveHeight: true,
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
        <Carousel {...settings} loading={loading}>
          {
            list[0].map(item => (
              <div key={item.Id}>
                <Link to={item.Url}>
                  <img src={isMobile ? item.image_Mobile : item.image_url} alt={item.Title} />
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
    const ItemNoticeList = {
      Id: '1',
      title: '系统公告',
      subhead: '号外号外，关于丰利金服春节不放假通知。',
      moreLink: '/404',
      children: [{
        id: '1',
        links: '/',
        title: '专业的实力团队',
        description: '高管团队出身于国有银行 专业专注',
        href: 'http://geewonii.top/phonelee/image/gonggao1.png',
      }, {
        id: '2',
        links: '/',
        title: '私人专属财富顾问',
        description: '1对1 交流 全面沟通 星级服务 极致体验',
        href: 'http://geewonii.top/phonelee/image/gonggao3.png',
      }, {
        id: '3',
        links: '/',
        title: '全方位风控保障',
        description: '严审客户资质 全面风控把控',
        href: 'http://geewonii.top/phonelee/image/gonggao4.png',
      }, {
        id: '4',
        links: '/',
        title: '透明规范合规体系',
        description: '响应号召 充分披露 合规合法 规范透明',
        href: 'http://geewonii.top/phonelee/image/gonggao2.png',
      }],
    };
    const { AllGodNum, EarnInterest, OperatingDays, TransactionAmount } = { ...(list[1] ? list[1][0]
      : { AllGodNum: '329090', EarnInterest: '100000', OperatingDays: '973', TransactionAmount: '1898200000' }),
    };
    const ItemNotice = list[1] ? (
      <div className={styles.project}>
        <Card
          title={ItemNoticeHeader(ItemNoticeList)}
          loading={loading}
          extra={<Link to="/" className={styles.more}>更多公告 <Icon type="right" /></Link>}
        >
          <List
            grid={{ gutter: 24, xs: 1, sm: 2, md: 4 }}
            dataSource={ItemNoticeList.children}
            renderItem={item => (
              <List.Item>
                <Link to="/credit">
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size="large" style={{ backgroundColor: '#fff', width: '48px', height: '48px' }} src={item.href} />}
                    title={item.title}
                    description={item.description}
                  />
                </Link>
              </List.Item>
            )}
          />
          <Row className={styles.system}>
            <Col xs={24} sm={12} md={12} lg={6} >
              平台运营<span> {Math.floor(OperatingDays / 365)}</span> 年
              <span> {Math.floor((OperatingDays % 365) / 31)}</span> 个月
              <span> {Math.floor(OperatingDays % 365 % 31)}</span> 天
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} >累计注册人数 <span> {AllGodNum}</span> 人</Col>
            <Col xs={24} sm={12} md={12} lg={6} >为投资人赚取 <span> {`${numberFormat(EarnInterest, 2, '.', ',')}`}</span> 元</Col>
            <Col xs={24} sm={12} md={12} lg={6} >累计交易金额 <span> {`${numberFormat(TransactionAmount, 2, '.', ',')}`}</span> 元</Col>
          </Row>
        </Card>
      </div>
    ) : null;

    // const ItemBidHeader = (todo) => {
    //   return (
    //     <div className={styles.header}>
    //       <div className={styles.title}>
    //         <h4>{todo.title}</h4>
    //         <span>{todo.subhead}</span>
    //       </div>
    //       <Link to={todo.moreLink || '/'} className={styles.more}>
    //         更多项目 <Icon type="right" />
    //       </Link>
    //     </div>
    //   );
    // };
    // const ItemBidList = list[0] ? (
    //   <div>
    //     {
    //       list[0].ItemBidList.map((todo) => {
    //         return (
    //           <div key={todo.parentId} className={styles.project}>
    //             <List
    //               rowKey="id"
    //               loading={loading}
    //               split={false}
    //               header={ItemBidHeader(todo)}
    //               grid={{ gutter: 24, xl: 4, lg: 2, md: 2, sm: 2, xs: 1 }}
    //               dataSource={todo.children}
    //               renderItem={item => (
    //                 <List.Item>
    //                   <ItemBid
    //                     links={item.links}
    //                     cover={item.cover}
    //                     title={item.title}
    //                     description={item.description}
    //                     percent={item.percent}
    //                     date={item.date}
    //                     annual={item.annual}
    //                     month={item.month}
    //                     num1={item.num1}
    //                     num2={item.num2}
    //                   />
    //                 </List.Item>
    //               )}
    //             />
    //           </div>
    //         );
    //       })
    //     }
    //   </div>
    // ) : null;

    // const alreadyList = list[0] ? (
    //   <div>
    //     <List
    //       rowKey="id"
    //       loading={loading}
    //       split={false}
    //       header={
    //         <div className={styles.title}>
    //           <h4>惠投资</h4>
    //           <span>收益最重要</span>
    //         </div>
    //       }
    //       grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
    //       dataSource={list[0].ItemBidList}
    //       renderItem={item => (
    //         <List.Item>
    //           <Link to="/">
    //             <Card
    //               title={item.title}
    //               bodyStyle={{ textAlign: 'center', fontSize: 0 }}
    //               bordered={false}
    //               hoverable
    //             >
    //               <WaterWave
    //                 height={161}
    //                 title="当前墨迹进度"
    //                 percent={34}
    //                 color="#f60"
    //                 contColor="#f60"
    //               />
    //             </Card>
    //           </Link>
    //         </List.Item>
    //       )}
    //     />
    //   </div>
    // ) : null;

    // const ItemBidColumnsList = list[0] ? (
    //   <div>
    //     {list[0].ItemBidColumnsList.map((item) => {
    //       return (
    //         <ItemBidColumns
    //           key={item.id}
    //           title={item.title}
    //           links={item.links}
    //           tips={item.tips}
    //           cover={item.cover}
    //           childrens={item.children}
    //           bgtop={item.bgtop}
    //           bgbottom={item.bgbottom}
    //         />
    //       );
    //     })}
    //   </div>
    // ) : null;

    return (
      <div className={styles.carousels}>
        {CarouselList}
        {ItemNotice}
        {/* {ItemBidList}
        {ItemBidColumnsList}
        {alreadyList} */}
      </div>
    );
  }
}
