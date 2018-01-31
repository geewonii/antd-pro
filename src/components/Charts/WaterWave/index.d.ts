import * as React from 'react';
export interface WaterWaveProps {
  title: React.ReactNode;
  color?: string;
  height: number;
  percent: number;
  style?: React.CSSProperties;
<<<<<<< HEAD
  contColor?: string;
=======
>>>>>>> upstream/master
}

export default class WaterWave extends React.Component<WaterWaveProps, any> {}
