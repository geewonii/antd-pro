import React, { createElement, Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

@connect()
export default class Exception extends Component {
  componentDidMount() {
    // 暂时在这跳转，需修改
    const { type, dispatch } = this.props;
    const pageType = type in config ? type : '404';
    if (pageType === '403') {
      dispatch(routerRedux.push({
        pathname: '/user/login',
      }));
    }
  }

  render() {
    const { className, linkElement = 'a', type, title, desc, img, actions, dispatch, ...rest } = this.props;
    const pageType = type in config ? type : '404';
    const clsString = classNames(styles.exception, className);
    return (
      <div className={clsString} {...rest}>
        <div className={styles.imgBlock}>
          <div
            className={styles.imgEle}
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div className={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div className={styles.desc}>{desc || config[pageType].desc}</div>
          <div className={styles.actions}>
            {
              actions ||
                createElement(linkElement, {
                  to: '/',
                  href: '/',
                }, <Button type="primary">返回首页</Button>)
            }
          </div>
        </div>
      </div>
    );
  }
}

// export default ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
//   const pageType = type in config ? type : '404';
//   const clsString = classNames(styles.exception, className);
//   return (
//     <div className={clsString} {...rest}>
//       <div className={styles.imgBlock}>
//         <div
//           className={styles.imgEle}
//           style={{ backgroundImage: `url(${img || config[pageType].img})` }}
//         />
//       </div>
//       <div className={styles.content}>
//         <h1>{title || config[pageType].title}</h1>
//         <div className={styles.desc}>{desc || config[pageType].desc}</div>
//         <div className={styles.actions}>
//           {
//             actions ||
//               createElement(linkElement, {
//                 to: '/',
//                 href: '/',
//               }, <Button type="primary">返回首页</Button>)
//           }
//         </div>
//       </div>
//     </div>
//   );
// };
