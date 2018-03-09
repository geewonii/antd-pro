import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Row, Col, Popover, Progress, Checkbox, message, Alert } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：弱</div>,
  no: <div className={styles.error}>不符合要求</div>,
  long: <div className={styles.error}>密码太长了</div>,
  less: <div className={styles.error}>密码太短了</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class Register extends PureComponent {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    autoRegister: false,
  };

  componentWillReceiveProps(nextProps) {
    const account = this.props.form.getFieldValue('mobile');
    if (nextProps.register.guid) {
      this.props.dispatch(routerRedux.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { getFieldValue } = this.props.form;
    const mobile = getFieldValue('mobile');
    if (mobile) {
      this.props.dispatch({
        type: 'register/getCaptcha',
        payload: {
          mobile,
        },
      });
      let count = 59;
      this.setState({ count });
      this.interval = setInterval(() => {
        count -= 1;
        this.setState({ count });
        if (count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    } else {
      message.info('请先输入手机号码');
    }
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const week = /^([a-zA-Z]){6,16}$|^(\d){6,16}$|^((?=[\x21-\x7e]+)[^A-Za-z0-9]){6,16}$|^(?!\2+$)(?!\1+$)[\2\1]{6,7}$|^(?!\3+$)(?!\1+$)[\3\1]{6,7}$|^(?!\3+$)(?!\2+$)[\2\3]{6,7}$|^(?=.*\3)(?=.*\1)(?=.*\2)[a-zA-Z\x21-\x7e\d]{6,7}$/;
    const middle1 = /^(?!\d+$)(?![a-zA-Z]+$)[\dA-Za-z]{8,16}$/;
    const middle2 = /^(?!((?=[\x21-\x7e]+)[^A-Za-z0-9])+$)(?![a-zA-Z]+$)[^\u4e00-\u9fa5\d]{8,16}$/;
    const middle3 = /^(?!((?=[\x21-\x7e]+)[^A-Za-z0-9])+$)(?!\d+$)[^\u4e00-\u9fa5a-zA-Z]{8,16}$/;
    const strong = /^(?=.*((?=[\x21-\x7e]+)[^A-Za-z0-9]))(?=.*[a-zA-Z])(?=.*[0-9])[^\u4e00-\u9fa5]{8,13}$/;
    if (value && value.match(strong)) {
      return 'ok';
    }
    if (value && (value.match(middle1) || value.match(middle2) || value.match(middle3))) {
      return 'pass';
    }
    if (value && value.match(week)) {
      return 'poor';
    }
    if (value && value.length < 6) {
      return 'less';
    }
    if (value && value.length > 16) {
      return 'long';
    }
    return 'no';
  };

  handleSubmit = (e) => {
    const { autoRegister } = this.state;
    e.preventDefault();
    if (autoRegister) {
      this.props.form.validateFields({ force: true }, (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'register/submit',
            payload: {
              ...values,
            },
          });
        }
      });
    } else {
      message.error('必须阅读并同意丰利金服服务协议');
    }
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changeAutoRegister = () => {
    this.setState({ autoRegister: !this.state.autoRegister });
  };

  renderMessage = (content, err) => {
    return (<Alert style={{ marginTop: 6 }} closable message={content} type={err || 'error'} showIcon />);
  }

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 160 ? 100 : value.length * 6}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting, register: { packet = null } } = this.props;
    const { getFieldDecorator } = form;
    const { count, autoRegister } = this.state;
    return (
      <div className={styles.main}>
        <h3 style={{ textAlign: 'center' }}>注册账号</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <InputGroup compact>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder="请输入手机号码"
                />
              )}
            </InputGroup>
            {packet && !packet.Code && this.renderMessage(packet.Message)}
          </FormItem>

          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('verifyCode', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                    {
                      pattern: /^\d{6}$/,
                      message: '验证码格式错误！',
                    },
                  ],
                })(<Input size="large" placeholder="验证码" />)}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
            {packet && packet.Code === 1 && this.renderMessage(packet.Message, 'info')}
          </FormItem>

          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    请输入 6 - 16 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="请输入密码，区分大小写"
                />
              )}
            </Popover>
          </FormItem>

          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请确认密码！',
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(<Input size="large" type="password" placeholder="确认密码" />)}
          </FormItem>

          <FormItem>
            <InputGroup compact>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的真实姓名!',
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder="请输入真实姓名"
                />
              )}
            </InputGroup>
          </FormItem>

          <FormItem>
            <InputGroup compact>
              {getFieldDecorator('recommendMobile', {
                rules: [
                  {
                    pattern: /^1\d{10}$/,
                    message: '推荐人手机号格式错误！',
                  },
                ],
              })(<Input
                size="large"
                placeholder="请输入推荐人手机号 (非必填)"
              />)}
            </InputGroup>
          </FormItem>

          <div style={{ marginBottom: '20px' }}>
            <Checkbox checked={autoRegister} onChange={this.changeAutoRegister}>
            我已阅读并同意丰利金服的 <a href="https://www.phonelee.com/Contract/ServiceAgreement">服务条款</a>
            </Checkbox>
          </div>

          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              立即注册
            </Button>
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
