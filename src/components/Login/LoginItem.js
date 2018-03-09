import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, message } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import map from './map';
import Packet from '../../utils/Packet';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
  return (WrappedComponent) => {
    return class BasicComponent extends Component {
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func,
      };
      constructor(props) {
        super(props);
        this.state = {
          count: 0,
          captchaUrl: null,
        };
      }
      componentDidMount() {
        if (this.context.updateActive) {
          this.context.updateActive(this.props.name);
        }
        this.onGetImgCaptcha();

        const mobile = localStorage.getItem('ph-mobile');
        if (mobile) {
          const { setFieldsValue } = this.context.form;
          setFieldsValue({ mobile });
          setFieldsValue({ userName: mobile });
        }
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
      onGetCaptcha = () => {
        const { getFieldValue } = this.context.form;
        const mobile = getFieldValue('mobile');
        if (mobile) {
          let count = 59;
          this.setState({ count });
          if (this.props.onGetCaptcha) {
            this.props.onGetCaptcha(mobile);
          }
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
      }
      onGetImgCaptcha = () => {
        fetch('/api/v1/users/post/get_captcha', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            credentials: 'include',
          },
          body: {},
        })
          .then((response) => {
            if (response.status >= 400) message.error('请求未成功');
            return response.json();
          })
          .then((res) => {
            const recv = new Packet();
            recv.ReadFrom(res);
            if (recv.Code === 1) {
              const captchaUrl = recv.GetItem(0, 0, 'data');
              const id = recv.GetItem(0, 0, 'id');
              if (this.props.onGetImgCaptcha) {
                this.props.onGetImgCaptcha(id);
              }
              this.setState({ captchaUrl });
            }
          });
      }
      render() {
        const { getFieldDecorator } = this.context.form;
        const options = {};
        let otherProps = {};
        const { onChange, defaultValue, rules, name, ...restProps } = this.props;
        const { count, captchaUrl } = this.state;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        otherProps = restProps || otherProps;
        if (type === 'Captcha') {
          const inputProps = omit(otherProps, ['onGetCaptcha']);
          return (
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator(name, options)(
                    <WrappedComponent {...defaultProps} {...inputProps} />
                  )}
                </Col>
                <Col span={8}>
                  <Button
                    disabled={count}
                    className={styles.getCaptcha}
                    size="large"
                    onClick={this.onGetCaptcha}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
          );
        }
        if (type === 'ImgCaptcha') {
          const inputProps = omit(otherProps, ['onGetImgCaptcha']);
          return (
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator(name, options)(
                    <WrappedComponent {...defaultProps} {...inputProps} />
                  )}
                </Col>
                <Col span={8}>
                  {
                    <img
                      style={{ width: '100%' }}
                      src={captchaUrl}
                      alt="验证码"
                      onClick={this.onGetImgCaptcha}
                    />
                  }
                </Col>
              </Row>
            </FormItem>
          );
        }
        return (
          <FormItem>
            {getFieldDecorator(name, options)(
              <WrappedComponent {...defaultProps} {...otherProps} />
            )}
          </FormItem>
        );
      }
    };
  };
}

const LoginItem = {};
Object.keys(map).forEach((item) => {
  LoginItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item,
  })(map[item].component);
});

export default LoginItem;
