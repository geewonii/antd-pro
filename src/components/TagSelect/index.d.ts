import * as React from 'react';
export interface TagSelectProps {
  onChange?: (value: Array<string>) => void;
  expandable?: boolean;
<<<<<<< HEAD
  style?: React.CSSProperties;
}
export interface TagSelectOptionProps {
  value: string;
=======
  value?: Array<string>| Array<number>;
  style?: React.CSSProperties;
}
export interface TagSelectOptionProps {
  value: string| number;
>>>>>>> upstream/master
  style?: React.CSSProperties;
}

export class TagSelectOption extends React.Component<
  TagSelectOptionProps,
  any
> {}

export default class TagSelect extends React.Component<TagSelectProps, any> {
  static Option: typeof TagSelectOption;
  children:
    | React.ReactElement<TagSelectOption>
    | Array<React.ReactElement<TagSelectOption>>;
}
