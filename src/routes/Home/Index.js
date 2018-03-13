import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Carousel, List, Icon, Card, Avatar, Row, Col, Spin, BackTop, Modal } from 'antd';
import { numberFormat } from '../../utils/utils';
// import { WaterWave } from '../../components/Charts';
import ItemBid from '../../components/ItemBid';
import ItemBidColumns from '../../components/ItemBidColumns';
import styles from './index.less';

@connect(({ global, home, loading }) => ({
  global,
  home,
  loading: loading.models.home,
}))
export default class Index extends PureComponent {
  state = { modalVisible: false }
  componentDidMount() {
    this.props.dispatch({
      type: 'home/homeInfoFetch',
    });
    this.props.dispatch({
      type: 'global/creditList',
    });
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    const { global: { creditListData = null }, home: { list = null }, loading } = this.props;
    const { modalVisible } = this.state;
    const antIcon = <Icon type="loading" spin />;
    if (list) {
      const { swiperImageList, noticeList, bidList, noticeData } = list;
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
      const CarouselList = swiperImageList ? (
        <div>
          <Carousel {...settings} loading={loading}>
            {
              swiperImageList.map(item => (
                <div key={item.Id}>
                  <Link to={item.Url}>
                    <img src={item.image_url} srcSet={`${item.image_Mobile} 2x`} alt={item.Title} />
                  </Link>
                </div>
              ))
            }
          </Carousel>
        </div>
      ) : null;

      const ItemNoticeHeader = (notice) => {
        return (
          <div className={styles.header}>
            <div className={styles.title}>
              <font>系统公告</font>
              <span className={styles.more} style={{ cursor: 'pointer' }} onClick={() => this.setModalVisible(true)}>
                <Icon type="notification" /> {notice.Title}
              </span>
            </div>
          </div>
        );
      };
      const { AllGodNum, EarnInterest, OperatingDays, TransactionAmount } = {
        ...(list ? list.noticeData.publicity :
          { AllGodNum: '329090', EarnInterest: '100000', OperatingDays: '1000', TransactionAmount: '1898200000' }),
      };
      // const {
      //   AllGodNum = AllGodNum || '329090',
      //   EarnInterest = EarnInterest || '100000',
      //   OperatingDays = OperatingDays || '1055',
      //   TransactionAmount = TransactionAmount || '1898200000',
      // } = {
      //   ...list.noticeData.publicity,
      // };
      const ItemNotice = noticeList ? (
        <div className={styles.project}>
          <Card
            title={ItemNoticeHeader(noticeData.notice)}
            loading={loading}
            extra={<a href="https://www.phonelee.com/Article/Index/1" className={styles.more}>更多公告 <Icon type="right" /></a>}
          >
            <List
              grid={{ gutter: 24, xs: 1, sm: 2, md: 4 }}
              dataSource={noticeList}
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
              <Col xs={0} sm={12} md={12} lg={6} >
                平台运营<span> {Math.floor(OperatingDays / 365)}</span> 年
                <span> {Math.floor((OperatingDays % 365) / 31)}</span> 个月
                <span> {Math.floor(OperatingDays % 365 % 31)}</span> 天
              </Col>
              <Col xs={0} sm={12} md={12} lg={6} >累计注册人数 <span> {AllGodNum}</span> 人</Col>
              <Col xs={0} sm={12} md={12} lg={6} >为投资人赚取 <span> {`${numberFormat(EarnInterest, 2, '.', ',')}`}</span> 元</Col>
              <Col xs={0} sm={12} md={12} lg={6} >累计交易金额 <span> {`${numberFormat(TransactionAmount, 2, '.', ',')}`}</span> 元</Col>
            </Row>
          </Card>
        </div>
      ) : null;

      const ItemBidHeader = () => {
        return (
          <div className={styles.header}>
            <div className={styles.title}>
              <h4>汇理财</h4>
              <span>省心最重要</span>
            </div>
            <Link to="/" className={styles.more}>
              更多项目 <Icon type="right" />
            </Link>
          </div>
        );
      };
      const ItemBidList = creditListData ? (
        <div className={styles.project}>
          <List
            rowKey="id"
            loading={loading}
            split={false}
            header={ItemBidHeader()}
            grid={{ gutter: 24, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
            dataSource={creditListData}
            renderItem={item => (
              <List.Item>
                <ItemBid
                  links={item.links}
                  cover={item.cover}
                  title={item.Name}
                  description={item.Remark}
                  percent={item.percent}
                  date={item.BidEndTime}
                  annual={item.GainsRate}
                  month={item.Deadline}
                  num1={item.num1}
                  amount={item.Amount}
                />
              </List.Item>
            )}
          />
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
      //           <h4>惠投资</h4>
      //           <span>收益最重要</span>
      //         </div>
      //       }
      //       grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
      //       dataSource={bidList}
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

      const ItemBidColumnsList = bidList ? (
        <div>
          {bidList.map((item) => {
            return (
              <ItemBidColumns
                key={item.id}
                title={item.title}
                links={item.links}
                tips={item.tips}
                cover={item.cover}
                childrens={item.children}
                bgtop={item.bgtop}
                bgbottom={item.bgbottom}
              />
            );
          })}
        </div>
      ) : null;

      return (
        <div className={styles.carousels}>
          {CarouselList}
          {ItemNotice}
          {ItemBidList}
          {ItemBidColumnsList}
          {/* {alreadyList} */}
          <Modal
            title={noticeData.notice.Title}
            wrapClassName="vertical-center-modal"
            visible={modalVisible}
            onOk={() => this.setModalVisible(false)}
            onCancel={() => this.setModalVisible(false)}
          >
            <p>{noticeData.notice.Contents}</p>
            <p>{noticeData.notice.UpdateTime}</p>
          </Modal>
          <BackTop>
            <Button type="primary" shape="circle" icon="up" size="large" />
          </BackTop>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Spin size="large" indicator={antIcon} />
        </div>
      );
    }
  }
}
