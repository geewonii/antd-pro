import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import { getRoutes } from '../utils/utils';
import logo from '../assets/logo.png';

@connect(({ global }) => ({
  global,
}))
export default class UserLayout extends PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '丰利金服';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 丰利金服`;
    }
    return title;
  }

  render() {
    const { routerData, match, global: { globalFooterData = null } } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  {/* <span className={styles.title}>丰利金服</span> */}
                </Link>
              </div>
              {/* <div className={styles.desc}>啦啦啦啦 德玛西亚</div> */}
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter className={styles.footer} globalFooterData={globalFooterData} />
        </div>
      </DocumentTitle>
    );
  }
}
