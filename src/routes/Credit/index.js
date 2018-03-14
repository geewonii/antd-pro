import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Row, Col, Progress, Input, Form, Button, Checkbox, List } from 'antd';
import numeral from 'numeral';
import Ellipsis from '../../components/Ellipsis';
import styles from './index.less';
import CountDownMore from '../../components/CountDownMore';
import DescriptionTable from '../../components/DescriptionTable';

const FormItem = Form.Item;

@connect(({ global, credit, loading }) => ({
  global,
  credit,
  loading: loading.models.credit,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Index extends PureComponent {
  state = {
    checkedboxs: false,
    titleKey: 'two',
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'credit/fetch',
      payload: {
        key: 'plc',
      },
    });
  }

  onEnd = () => {
    // do something
  }

  onTabChange = (titleKey) => { this.setState({ titleKey }); }

  changeRead = (e) => { this.setState({ checkedboxs: e.target.checked }); }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { global: { isMobile = null }, credit: { list }, loading, submitting } = this.props;
    const { checkedboxs, titleKey } = this.state;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 22 },
      },
    };
    const headDom = list ? (
      <div className={styles.head}>
        <div className={styles.title}>
          <div className={styles.titleLeft}>
            <h2>{list.title}</h2>
            <span>{list.business}</span>
          </div>
          <div className={styles.titleRight}>
            <Link to={list.deal.links}>{list.deal.text}</Link>
          </div>
        </div>
        <div className={styles.earnings}>
          {
            list.earnings && list.earnings.map((item) => {
              return (
                <div className={styles.earningsItem} key={item.id}>
                  <div>{item.title}</div>
                  <span>{item.tips}</span>
                </div>
              );
            })
          }
        </div>
        <div className={styles.progress}>
          <font>投资进度：</font>
          <Progress percent={parseFloat(list.progress) || 0} />
        </div>
        <div className={styles.explain}>
          {
            list.explain && list.explain.map((item) => {
              return <div key={item.id}>{item.title}</div>;
            })
          }
        </div>
      </div>
    ) : null;

    const content = list ? (
      <div>
        <Row style={{ marginBottom: '24px' }}>
          <Col xl={17} lg={16} md={0} sm={0} xs={0} style={{ paddingRight: '20px' }}>
            <Card bodyStyle={{ padding: '0' }} loading={loading}>
              {headDom}
            </Card>
          </Col>
          <Col xl={7} lg={8} md={24}>
            <Card loading={loading}>
              <Row>
                <Col lg={0} md={24}>
                  {headDom}
                </Col>
              </Row>
              <CountDownMore
                stop={new Date(list.countdown)}
                size={36}
                onEnd={this.onEnd}
              />
              <div className={styles.residue}>
                剩余金额：<span>{numeral(list.residue).format('0,0')}元</span>
              </div>
              <Form
                hideRequiredMark
                onSubmit={this.handleSubmit}
              >
                <FormItem
                  {...formItemLayout}
                  label=""
                >
                  {getFieldDecorator('jine', {
                    rules: [{
                      required: true, message: '请输入投标金额',
                    }],
                  })(
                    <Input size="large" placeholder="起投金额1000元" />
                  )}
                </FormItem>
                <div className={styles.balance}>
                  <div>账户可用余额</div>
                  <div><span>{`${list.qq}`}</span>元</div>
                </div>
                <div className={styles.balance}>
                  <div>账户赠送红包余额</div>
                  <div><span>{`${list.qq}`}</span>元</div>
                </div>
                <div className={styles.totalRevenue}>
                  预计总收益<span>{`${list.qq}`}</span>元
                </div>
                <Checkbox checked={checkedboxs} onChange={this.changeRead}>我已阅读并同意丰利金服的 <a href="https://www.phonelee.com/Contract/%E5%90%88%E5%90%8C?creditId=4218&godId=0&pdfName=%E6%B1%87%E7%90%86%E8%B4%A2%E6%8A%95%E8%B5%84%E5%8D%8F%E8%AE%AE1">借款协议</a></Checkbox>
                <FormItem style={{ marginTop: 20 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    style={{ width: '100%', fontSize: '24px', height: '50px' }}
                  >
                    立即投标
                  </Button>
                </FormItem>
              </Form>
              <div style={{ textAlign: 'center', color: '#f60' }}>投资有风险，理财需谨慎</div>
            </Card>
          </Col>
        </Row>
      </div>
    ) : null;

    const tabListNoTitle = [
      {
        key: 'one',
        tab: '借款信息',
      }, {
        key: 'two',
        tab: '投标记录',
      }, {
        key: 'three',
        tab: '还款计划',
      }, {
        key: 'four',
        tab: '风险提示',
      }, {
        key: 'five',
        tab: '常见问题',
      },
    ];
    const one = list ? (
      <List
        size="small"
        itemLayout="vertical"
        dataSource={list.one}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              description={
                <div style={{ display: 'flex' }}>
                  <h4 style={{ minWidth: '60px', marginRight: '12px' }}>{item.title}</h4>
                  <Ellipsis style={{ flex: 1 }} tooltip length={isMobile ? 80 : 250}>
                    {item.description}
                  </Ellipsis>
                </div>
              }
            />
          </List.Item>
        )}
      />
    ) : null;
    const width = isMobile ? 120 : 164;
    const columns = [
      {
        title: '投标人',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width,
      }, {
        title: '投标金额',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '投资利率',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '投标时间',
        dataIndex: 'dd',
        key: 'dd',
      }, {
        title: '投标类型',
        dataIndex: 'ee',
        key: 'ee',
      },
    ];
    const two = list ? (
      <DescriptionTable
        columns={columns}
        dataSource={list.two}
      />
    ) : null;
    const contentListNoTitle = {
      one,
      two,
      three: two,
      four: one,
      five: one,
    };

    return (
      <div className={styles.credit}>
        <div className={styles.nav}>
          <img src={list ? list.nav.navUrl : 'https://www.phonelee.com/Credit/NewCunQian/4219'} alt={list ? list.title : ''} />
          <div>投资有风险，理财需谨慎，点击查看 <Link to={list ? list.nav.links : 'https://www.phonelee.com/Credit/PastHuiLiCaiList'}>过往产品</Link></div>
        </div>
        <div className={styles.content}>
          {content}
          <Card
            hoverable
            loading={loading}
            tabList={tabListNoTitle}
            activeTabKey={titleKey}
            onTabChange={(key) => { this.onTabChange(key); }}
          >
            {contentListNoTitle[titleKey]}
          </Card>
        </div>
      </div>
    );
  }
}
