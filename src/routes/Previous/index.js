import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Card, Row, Col, Input, Form, Button } from 'antd';
// import numeral from 'numeral';
// import Ellipsis from '../../components/Ellipsis';
import DescriptionTable from '../../components/DescriptionTable';
import styles from './index.less';

@connect(({ global, credit, loading }) => ({
  global,
  credit,
  loading: loading.models.credit,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class Index extends PureComponent {
  state = {
    titleKey: 'one',
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'credit/fetch',
      payload: {
        key: 'plc',
      },
    });
  }

  onTabChange = (titleKey) => { this.setState({ titleKey }); }

  render() {
    const { global: { isMobile = null }, credit: { list }, loading, submitting } = this.props;
    const { titleKey } = this.state;

    const search = list ? (
      <div>
        <Row style={{ margin: '24px 0' }}>
          <Col>
            <Card loading={loading}>
              <div className={styles.title}><span>汇理财</span>往期列表</div>
              <div className={styles.search}>
                <Input
                  size="large"
                  placeholder="输入标题或者编号"
                  ref={(node) => { this.input = node; }}
                  onKeyDown={this.onKeyDown}
                  onBlur={this.leaveSearchMode}
                />
                <Button
                  size="large"
                  type="primary"
                  loading={submitting}
                  htmlType="submit"
                >
                  点击搜索
                </Button>
              </div>
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
      },
    ];
    const width = isMobile ? 120 : 164;
    const columns = [
      {
        title: '借款标的',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width,
      }, {
        title: '预期年化收益',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '锁定期限',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: '借款总额（元）',
        dataIndex: 'dd',
        key: 'dd',
      }, {
        title: '进度',
        dataIndex: 'ee',
        key: 'ee',
      }, {
        title: '项目详情',
        dataIndex: 'ff',
        key: 'ff',
      }, {
        title: '状态',
        dataIndex: 'gg',
        key: 'gg',
      },
    ];
    const table = list ? (
      <DescriptionTable
        columns={columns}
        dataSource={list.two}
      />
    ) : null;
    const contentListNoTitle = {
      one: table,
      two: table,
      three: table,
      four: table,
    };

    return (
      <div className={styles.previous}>
        {search}
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
    );
  }
}
