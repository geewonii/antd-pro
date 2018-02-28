import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Row, Col, Progress, Input, Form, Button, Checkbox } from 'antd';
import { numberFormat } from '../../utils/utils';
import styles from './index.less';
import CountDownMore from '../../components/CountDownMore';

const FormItem = Form.Item;
@connect(({ global, credit, loading }) => ({
  global,
  credit,
  loading: loading.models.credit,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Index extends PureComponent {
  state = { checkedboxs: false }
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

  changeRead = (e) => {
    this.setState({
      checkedboxs: e.target.checked,
    });
  }

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
    const { credit: { list = [] }, loading, submitting } = this.props;
    const { checkedboxs } = this.state;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 22 },
      },
    };
    let data = null;
    if (list.getCreditData) {
      [data] = [...list.getCreditData];
    }
    const headDom = data ? (
      <div className={styles.head}>
        <div className={styles.title}>
          <div className={styles.titleLeft}>
            <h2>{data.title}</h2>
            <span>{data.business}</span>
          </div>
          <div className={styles.titleRight}>
            <Link to={data.deal.links}>{data.deal.text}</Link>
          </div>
        </div>
        <div className={styles.earnings}>
          {
            data.earnings && data.earnings.map((item) => {
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
          <Progress percent={parseFloat(data.progress) || 0} />
        </div>
        <div className={styles.explain}>
          {
            data.explain && data.explain.map((item) => {
              return <div key={item.id}>{item.title}</div>;
            })
          }
        </div>
      </div>
    ) : null;

    const content = data ? (
      <div>
        <Row>
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
                stop={new Date(data.countdown)}
                size={36}
                onEnd={this.onEnd}
              />
              <div className={styles.residue}>
                剩余金额：<span>{numberFormat(data.residue)}元</span>
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
                  <div><span>{`${data.qq}`}</span>元</div>
                </div>
                <div className={styles.balance}>
                  <div>账户赠送红包余额</div>
                  <div><span>{`${data.qq}`}</span>元</div>
                </div>
                <div className={styles.totalRevenue}>
                  预计总收益<span>{`${data.qq}`}</span>元
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

    return (
      <div className={styles.credit}>
        <div className={styles.nav}>
          <img src={data ? data.nav.navUrl : 'https://www.phonelee.com/Credit/NewCunQian/4219'} alt={data ? data.title : ''} />
          <div>投资有风险，理财需谨慎，点击查看 <Link to={data ? data.nav.links : 'https://www.phonelee.com/Credit/PastHuiLiCaiList'}>过往产品</Link></div>
        </div>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    );
  }
}
