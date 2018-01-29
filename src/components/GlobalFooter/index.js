import React from 'react';
import { Icon, Row, Col } from 'antd';
import { Link } from 'dva/router';
import classNames from 'classnames';
import styles from './index.less';
import icpImage from '../../assets/icp.png';
import hujinImage from '../../assets/hujin.png';
import beianImage from '../../assets/beian.png';
import wxSealImage from '../../assets/wx_seal.png';
import certImage from '../../assets/cert.png';
import cnnicImage from '../../assets/cnnic.png';
import vSealImage from '../../assets/v_seal.png';

export default ({ className, globalFooterData }) => {
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
            globalFooterData && (
              <div className={styles.links}>
                {globalFooterData.links.map(todo => (
                  <div key={todo.key}>
                    <div>
                      {
                        todo.blankTarget
                        ?
                        todo.href ? <Link to={todo.href} >{todo.title}</Link> : todo.title
                        :
                        todo.href ? <Link to={todo.href} >{todo.title}</Link> : todo.title
                      }
                    </div>
                    {
                      todo.children && todo.children.map(
                        list => (
                          <div key={list.key} style={{ fontSize: '12px', textAlign: 'center' }}>
                            {
                              list.blankTarget
                              ?
                              list.href ? <Link to={list.href} >{list.title}</Link> : list.title
                              :
                              list.href ? <Link to={list.href} >{list.title}</Link> : list.title
                            }
                          </div>
                      ))
                    }
                  </div>
                ))}
              </div>
            )
          }
        </Col>
        <Col {...infoProps}>
          <div className={styles.words}>
            {
              globalFooterData && globalFooterData.words.map(todo => (
                <div key={todo.key}>
                  <Icon type={todo.icon} />
                  &nbsp;{todo.title}
                  <span className={todo.className ? styles[todo.className] : ''} >
                    {todo.content}
                  </span>
                </div>
              ))
            }
          </div>
        </Col>
        <Col {...codeProps} className={styles.code}>
          {
            globalFooterData && globalFooterData.qrCode.map(todo => (
              <Col span={11} key={todo.key}>
                <img src={todo.imgUrl} alt={todo.title} />
                <p>{todo.title}</p>
              </Col>
            ))
          }
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
