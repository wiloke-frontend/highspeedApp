import { ReactNode, CSSProperties, Component } from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface AttrType {
  src: string;
  width: number;
  class: string;
  [key: string]: any;
}

export interface PassPropsType {
  key: string;
}

export type ChildrenType = ReactNode;

interface HTMLProps {
  html: string;
  imagesMaxWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
  renderers: {
    [key: string]: (attr: AttrType, children: ChildrenType, convertedCSSStyles: CSSProperties, passProps: PassPropsType) => ReactNode;
  };
  onLinkPress?: (event: React.MouseEvent, href: string) => void;
  tagsStyles?: {
    [key: string]: CSSProperties | ViewStyle | TextStyle | ImageStyle;
  };
}

export default class HTML extends Component<HTMLProps> {}
