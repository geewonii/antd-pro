import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, ImgCaptcha, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends PureComponent {
  state = {
    type: 'account',
    autoLogin: true,
    captchaId: undefined,
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  getImgCaptchaId = (id) => {
    this.setState({ captchaId: id });
  }

  getPhoneCaptcha = (mobile) => {
    this.props.dispatch({
      type: 'login/getPhoneCaptcha',
      payload: {
        mobile,
      },
    });
  }

  handleSubmit = (err, values) => {
    const { type, autoLogin } = this.state;
    if (!err) {
      if ('userName' in values) {
        const mobile = values.userName;
        const value = { ...values, mobile, captchaId: this.state.captchaId };
        this.props.dispatch({
          type: 'login/login',
          payload: {
            ...value,
            type,
            autoLogin,
          },
        });
        return;
      }
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
          autoLogin,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content, state) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type={state || 'error'} showIcon />
    );
  }

  render() {
    const { login: { phoneCaptchaState = null, status = null }, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            {
              !!status &&
              status.Code === 0 &&
              this.renderMessage(status.Message)
            }
            <UserName name="userName" placeholder="请输入手机号" />
            <Password name="password" placeholder="请输入密码" />
            <ImgCaptcha name="image_code" onGetImgCaptcha={this.getImgCaptchaId} />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            <Mobile name="mobile" />
            <Captcha name="sms_code" onGetCaptcha={this.getPhoneCaptcha} />
            {
              phoneCaptchaState &&
              (phoneCaptchaState.Code === 0 ?
              this.renderMessage(phoneCaptchaState.Message) :
              this.renderMessage('验证码已发送，请注意查收', 'info'))
            }
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>记住账号</Checkbox>
            <a style={{ float: 'right' }} href="https://www.phonelee.com/God/ForgotPassword">忘记密码</a>
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon className={styles.icon} type="wechat" />
            <Link className={styles.register} to="/user/register">注册账户</Link>
          </div>
        </Login>
      </div>
    );
  }
}
