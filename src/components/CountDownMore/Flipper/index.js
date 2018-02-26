import React, { PureComponent } from 'react';
import classNames from 'classnames';
import schema from './schema.js';
import styles from './index.less';

export default class Flipper extends PureComponent {
  state = { toggle: false };

  componentWillReceiveProps(newProps) {
    if (newProps.now !== this.props.now) this.tick();
  }

  getRange(initial) {
    const prev = this.getCount(initial, 'prev');
    const arr = [initial, prev, this.getCount(prev, 'prev')];
    arr[!this.state.toggle ?
      'unshift' :
      'push'
    ](!this.state.toggle ?
      this.getCount(initial, 'next') :
      this.getCount(prev, 'prev'));
    return arr;
  }

  getCount(current, direction) {
    const isRev = this.props.reverse;
    const isNext = direction === 'next';
    const head = this.props[isRev ? 'min' : 'max'];
    const tail = this.props[isRev ? 'max' : 'min'];

    return isNext ?
      current === head ? tail : current + (isRev ? -1 : 1) :
      current === tail ? head : current + (isRev ? 1 : -1);
  }

  tick = () => {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { size } = this.props;
    return (
      <div className={styles.cards}>
        {this.getRange(this.props.now).map((val, i) => {
          const card = classNames(styles.card, val === this.props.now ? styles.now : '');
          const idx = i;
          return (
            <div
              key={`flip-card${idx}`}
              className={card}
              style={{ fontSize: `${size}px`, marginTop: `-${size / 2}px` }}
            >
              <div className={styles.sides}>
                {['front', 'back'].map((key) => {
                  const side = classNames(styles.side, styles[key]);
                  return (
                    <div key={`side${key}`} className={side}>
                      <div className={styles.sideNum}>
                        {key === 'front' ? val : this.getCount(val, 'next')}
                      </div>
                    </div>
                  );
                }
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Flipper.propTypes = schema.types;

Flipper.defaultProps = schema.defaults;
