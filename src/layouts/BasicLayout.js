import React from 'react';
import PropTypes from 'prop-types';
import { Layout, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import HeaderMenu from '../components/HeaderMenu';
import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.png';
import logoMobile from '../assets/logoMobile.png';

const { Content } = Layout;
const { AuthorizedRoute } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {
    isMobile,
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '丰利金服';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 丰利金服`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);
    const redirect = urlParams.searchParams.get('redirect') || '/home';
    // Remove the parameters in the url
    urlParams.searchParams.delete('redirect');
    window.history.pushState(null, 'redirect', urlParams.href);
    return redirect;
  }
  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  }
  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  }
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  }
  render() {
    const {
      currentUser, collapsed, fetchingNotices, notices, routerData, match, location,
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layoutPc = (
      <Layout>
        <GlobalHeader
          logo={logo}
          currentUser={currentUser}
          fetchingNotices={fetchingNotices}
          notices={notices}
          collapsed={collapsed}
          isMobile={this.state.isMobile}
          onNoticeClear={this.handleNoticeClear}
          onCollapse={this.handleMenuCollapse}
          onMenuClick={this.handleMenuClick}
          onNoticeVisibleChange={this.handleNoticeVisibleChange}
        />
        <HeaderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <div style={{ minHeight: 'calc(100vh - 300px)' }}>
              <Switch>
                {
                  redirectData.map(item =>
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  )
                }
                {
                  getRoutes(match.path, routerData).map(item =>
                    (
                      <AuthorizedRoute
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                        authority={item.authority}
                        redirectPath="/exception/403"
                      />
                    )
                  )
                }
                <Redirect exact from="/" to={bashRedirect} style={{ margin: '-24px -24px 0' }} />
                <Route render={NotFound} />
              </Switch>
            </div>
            <GlobalFooter
              links={[{
                key: '新手指南',
                title: '新手指南',
                children: [
                  {
                    key: '公司简介',
                    title: <Link to="/home" >公司简介</Link>,
                  }, {
                    key: '组织信息',
                    title: <Link to="/home" >组织信息</Link>,
                  }],
              }, {
                key: '诚信保障',
                title: '诚信保障',
                blankTarget: true,
              }, {
                key: '怎么理财',
                title: '怎么理财',
                blankTarget: true,
              }, {
                key: '关于我们',
                title: '关于我们',
                blankTarget: true,
              }]}
            />
          </Content>
        </Layout>
      </Layout>
    );
    const layoutMobile = (
      <Layout>
        <HeaderMenu
          logo={logoMobile}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <GlobalHeader
            logo={logoMobile}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={this.state.isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
          <Content style={{ margin: '88px 24px 0', height: '100%' }}>
            <div style={{ minHeight: 'calc(100vh - 180px)' }}>
              <Switch>
                {
                  redirectData.map(item =>
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  )
                }
                {
                  getRoutes(match.path, routerData).map(item =>
                    (
                      <AuthorizedRoute
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                        authority={item.authority}
                        redirectPath="/exception/403"
                      />
                    )
                  )
                }
                <Redirect exact from="/" to={bashRedirect} />
                <Route render={NotFound} />
              </Switch>
            </div>
            <GlobalFooter
              links={[{
                key: '新手指南',
                title: '新手指南',
                children: [
                  {
                    key: '公司简介',
                    title: <Link to="/home" >公司简介</Link>,
                  }, {
                    key: '组织信息',
                    title: <Link to="/home" >组织信息</Link>,
                  }],
              }, {
                key: '诚信保障',
                title: '诚信保障',
                blankTarget: true,
              }, {
                key: '怎么理财',
                title: '怎么理财',
                blankTarget: true,
              }, {
                key: '关于我们',
                title: '关于我们',
                blankTarget: true,
              }]}
            />
          </Content>
        </Layout>
      </Layout>
    );
    const layout = this.state.isMobile ? layoutMobile : layoutPc;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BasicLayout);
