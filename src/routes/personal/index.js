import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Redirect, Route, Switch } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import styles from './index.less';
import { getMenuData } from '../../common/userMenu';
import InlineMenu from '../../components/InlineMenu';
import NotFound from '../../routes/Exception/404';

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

@connect(({ global }) => ({
  global,
  loading: global.loading,
}))
export default class Index extends PureComponent {
  state = {
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'credit/fetch',
      payload: {
        key: 'plc',
      },
    });
  }

  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }

  render() {
    const {
      global: { isMobile = undefined, collapsed = undefined },
      location, match, routerData,
    } = this.props;
    return (
      <div className={styles.personal}>
        <InlineMenu
          menuData={getMenuData()}
          isMobile={isMobile}
          location={location}
          collapsed={collapsed}
          onCollapse={this.handleMenuCollapse}
        />
        <div className={styles.content}>
          <Switch>
            {
              redirectData.map(item =>
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              )
            }
            {
              getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    redirectPath="/exception/403"
                  />
                )
              )
            }
            <Route render={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
