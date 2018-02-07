import * as React from 'react';
export interface ResultProps {
  links?: string;
  cover?: string;
  title?: string;
  description?: React.ReactNode;
  annual?: Number;
  month?: Number;
  annual?: Number;
  month?: Number;
  num1?: Number;
  num2?: Number;
  date?: string;
  style?: React.CSSProperties;
}

export default class ItemBid extends React.Component<ResultProps, any> {}
