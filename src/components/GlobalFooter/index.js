import React from 'react';
import { Icon, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import icpImage from '../../assets/icp.png';
import hujinImage from '../../assets/hujin.png';
import beianImage from '../../assets/beian.png';
import wxSealImage from '../../assets/wx_seal.png';
import certImage from '../../assets/cert.png';
import cnnicImage from '../../assets/cnnic.png';
import vSealImage from '../../assets/v_seal.png';

export default ({ className, links }) => {
  const clsString = classNames(styles.globalFooter, className);
  const infoProps = {
    xs: 20,
    sm: 20,
    md: 12,
    lg: 10,
    xl: 6,
    style: { marginBottom: 10 },
    push: 2,
  };
  const codeProps = {
    xs: 20,
    sm: 20,
    md: 12,
    lg: 10,
    xl: 6,
    push: 2,
  };
  const crProps = {
    xs: 20,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 5,
    style: { marginBottom: 10 },
    push: 2,
  };
  return (
    <div className={clsString}>
      <Row gutter={24} className={styles.info}>
        <Col {...infoProps}>
          {
            links && (
              <div className={styles.links}>
                {links.map(todo => (
                  <div key={todo.key}>
                    <div>{todo.title}</div>
                    {
                      todo.children && todo.children.map(
                        list => <div key={list.key}>{list.title}</div>
                      )
                    }
                  </div>
                ))}
              </div>
            )
          }
        </Col>
        <Col {...infoProps}>
          <div className={styles.words}>
            <div><Icon type="phone" /> 客服电话：<strong style={{ fontSize: '20px' }}>400-837-2223</strong></div>
            <div><Icon type="mail" /> 客服邮箱：service@phonelee.com</div>
            <div><Icon type="hourglass" /> 服务时间：9:00-18:00(周一至周五)</div>
          </div>
        </Col>
        <Col {...codeProps} className={styles.code}>
          <Col span={11}>
            <img src="https://www.phonelee.com/Content/siteimages/%E4%B8%B0%E5%88%A9%E9%87%91%E6%9C%8D%E6%9C%8D%E5%8A%A1%E5%8F%B72.jpg" alt="" />
            <p>关注微信服务号</p>
          </Col>
          <Col span={11}>
            <img src="https://www.phonelee.com/Content/siteimages/%E5%BE%AE%E5%8D%9A.jpg" alt="" />
            <p>关注微博</p>
          </Col>
        </Col>
      </Row>
      <Row gutter={24} className={styles.copyright}>
        <Col {...crProps} className={styles.image}>
          <a href="" target="_blank"><img src={icpImage} alt="" /> 粤ICP备15000642号-1</a>
        </Col>
        <Col {...crProps} className={styles.image}>
          <a href="" target="_blank"><img src={beianImage} alt="" /> 粤公网安备 44010602003127号</a>
        </Col>
        <Col {...crProps} className={styles.image}>
          <a href="" target="_blank"><img src={hujinImage} alt="" /> 互联网金融协会违规行为投诉</a>
        </Col>
        <Col {...crProps} className={styles.images}>
          <a href="" target="_blank"><img src={vSealImage} alt="" /></a>
          <a href="" target="_blank"><img src={certImage} alt="" /></a>
          <a href="" target="_blank"><img src={cnnicImage} alt="" /></a>
          <a href="" target="_blank"><img src={wxSealImage} alt="" /></a>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} className={styles.footer}>
          <a href="" target="_blank">© 2015 丰利金服 All rights reserved</a>
        </Col>
      </Row>
    </div>
  );
};
