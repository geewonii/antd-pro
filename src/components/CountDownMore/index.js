import React, { PureComponent } from 'react';
import Flipper from './Flipper';
// import schema from './schema.js';
import styles from './index.less';

export default class Countdown extends PureComponent {
  state = {
    diff: this.getDiffObject(),
  };

  componentDidMount() {
    this.interval = window.setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  getDiffObject() {
    let future = this.props.stop.getTime();
    if (future - (new Date()).getTime() < 0) {
      future = (24 * 60 * 60 * 1000) + future;
    }
    const ms = Math.abs(future - (new Date()).getTime());

    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    // const d = Math.floor(h / 24);

    return {
      days: Math.floor(h / 24),
      hours: h % 24,
      minutes: m % 60,
      seconds: s % 60,
    };
  }

  fixedZero = (data) => {
    return `${data < 10 ? `0${data}` : data}`;
  }

  updateTime() {
    this.setState({ diff: this.getDiffObject() });
  }

  render() {
    const forks = {
      days: [[0, 9], [0, 9]],
      hours: [[0, 2], [0, 4]],
      minutes: [[0, 5], [0, 9]],
      seconds: [[0, 5], [0, 9]],
    };
    const { size } = this.props;
    return (
      <div className={styles.countdown}>
        {Object.keys(this.state.diff).map((key) => {
          return (
            <div key={key} className={styles[`countdown-${key}`]}>
              <div className={styles.countdownWrap}>
                {Array(2).fill(0).map((_, i) => {
                  const idx = i;
                  return (
                    <Flipper
                      key={`${key}${idx}`}
                      reverse
                      now={+this.fixedZero(this.state.diff[key])[i]}
                      min={forks[key][i][0]}
                      max={forks[key][i][1]}
                      size={size}
                    />
                  );
                })}
              </div>
              {
                key !== 'seconds' &&
                <div className={styles.countdownAfter} style={{ lineHeight: `${size}px`, fontSize: `${size}px` }}>:</div>
              }
            </div>
          );
        })}
      </div>
    );
  }
}

// Countdown.propTypes = schema.types;

// Countdown.defaultProps = schema.defaults;
