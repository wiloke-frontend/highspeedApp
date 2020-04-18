import React, { ComponentType, forwardRef, ReactNode } from 'react';
import { StyleProp, TextStyle, Text } from 'react-native';
import { Tailwind, Color, Tachyons, Colors } from 'shared/types/types';
import { getTailwindStyle } from 'shared/utils/getTailwindStyle';
import { useTheme, Sizes } from 'shared/components/ThemeContext/ThemeContext';
import { getTachyonsStyle } from 'shared/utils/getTachyonsStyle';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';
import { fontWeightTitle, fontWeightText } from 'utils/constants/font';

export type Photography = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'p' | 'i' | 'small';

export interface WithTextStylesProps {
  tailwind?: Tailwind;
  tachyons?: Tachyons;
  type?: Photography;
  size?: number;
  style?: StyleProp<TextStyle>;
  backgroundColor?: Color;
  color?: Color;
  colorNative?: string;
  children?: ReactNode;
}

const CONSTANT_LINE_HEIGHT = 1.37;
const CONSTANT_H1 = 2.2;
const CONSTANT_H2 = 2;
const CONSTANT_H3 = 1.75;
const CONSTANT_H4 = 1.6;
const CONSTANT_H5 = 1.4;
const CONSTANT_H6 = 1.3;
const CONSTANT_H7 = 1;
const CONSTANT_H8 = 0.8;
const CONSTANT_SMALL = 0.8;

function _getTextStyle(type: Photography, sizes: Sizes, colors: Colors, colorNative: string, color?: Color): TextStyle {
  const { font } = sizes;
  const headingColor = !!colorNative ? colorNative : !!color ? colors[color] : colors.dark1;
  const textColor = !!colorNative ? colorNative : !!color ? colors[color] : colors.dark2;

  switch (type) {
    case 'h1':
      return {
        fontSize: font * CONSTANT_H1,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H1,
        color: headingColor,
      };
    case 'h2':
      return {
        fontSize: font * CONSTANT_H2,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H2,
        color: headingColor,
      };
    case 'h3':
      return {
        fontSize: font * CONSTANT_H3,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H3,
        color: headingColor,
      };
    case 'h4':
      return {
        fontSize: font * CONSTANT_H4,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H4,
        color: headingColor,
      };
    case 'h5':
      return {
        fontSize: font * CONSTANT_H5,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H5,
        color: headingColor,
      };
    case 'h6':
      return {
        fontSize: font * CONSTANT_H6,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H6,
        color: headingColor,
      };
    case 'h7':
      return {
        fontSize: font * CONSTANT_H7,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H7,
        color: headingColor,
      };
    case 'h8':
      return {
        fontSize: font * CONSTANT_H8,
        ...fontWeightTitle,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_H8,
        color: headingColor,
      };
    case 'p':
      return {
        fontSize: font,
        ...fontWeightText,
        lineHeight: font * CONSTANT_LINE_HEIGHT,
        color: textColor,
      };
    case 'i':
      return {
        fontSize: font,
        ...fontWeightText,
        lineHeight: font * CONSTANT_LINE_HEIGHT,
        color: textColor,
        fontStyle: 'italic',
      };
    case 'small':
      return {
        fontSize: font * CONSTANT_SMALL,
        ...fontWeightText,
        lineHeight: font * CONSTANT_LINE_HEIGHT * CONSTANT_SMALL,
        color: textColor,
      };
    default:
      return {};
  }
}

export function withTextStyles<P extends object>(Component: ComponentType<P>, styleProp = 'style') {
  const WithTextStyles = forwardRef<Text, P & WithTextStylesProps>(
    ({ tailwind = [], tachyons = [], type = 'p', size, color, colorNative = '', backgroundColor = 'transparent', style = {}, ...rest }, ref) => {
      const { sizes, colors } = useTheme();
      const inlineStyle = [
        { backgroundColor: !!colors[backgroundColor] ? colors[backgroundColor] : backgroundColor },
        !!size ? { fontSize: size } : {},
      ];
      const textStyle = _getTextStyle(type, sizes, colors, colorNative, color);
      const styles = [textStyle, inlineStyle, getTailwindStyle(tailwind), getTachyonsStyle(tachyons), style];

      return <Component ref={ref} {...(rest as P)} {...{ [styleProp]: styles }} />;
    },
  );

  WithTextStyles.displayName = `WithTextStyles(${getDisplayNameHOC(Component)})`;

  return WithTextStyles;
}
