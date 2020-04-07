import React, { memo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View, ViewProps } from 'shared/components/View/View';
import { Color, BorderWidth } from 'shared/types/types';
import getBorderWidthStyle from 'shared/utils/getBorderWidthStyle';
import { useTheme } from '../ThemeContext/ThemeContext';
import { styles } from './styles';
import { withTailwind } from 'shared/hocs/withTailwind';

export interface CardProps extends ViewProps {
  Header?: ReactNode;
  Body?: ReactNode;
  Footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
  borderColor?: Color;
  borderWidth?: BorderWidth;
  shadow?: boolean;
  backgroundColor?: Color;
  useDivider?: boolean;
  dividerColor?: Color;
  borderRadius?: number;
}

function CardComponent({
  Header,
  Body,
  Footer,
  borderColor = 'gray1',
  borderWidth,
  shadow,
  backgroundColor = 'light',
  useDivider = false,
  dividerColor = 'gray2',
  style = {},
  borderRadius = 0,
  ...otherProps
}: CardProps) {
  const { colors } = useTheme();
  const borderWidthStyle = !!borderWidth ? getBorderWidthStyle(borderWidth) : {};
  const shadowStyle = shadow ? styles.shadow : {};
  const dividerStyle: StyleProp<ViewStyle> = useDivider ? [styles.divider, { borderColor: colors[dividerColor] }] : {};
  const inlineStyle = {
    borderColor: colors[borderColor],
    backgroundColor: colors[backgroundColor],
    borderRadius,
  };
  return (
    <View {...otherProps} style={[borderWidthStyle, shadowStyle, inlineStyle, style]}>
      {!!Header && <View style={[styles.header, !!Body || !!Footer ? dividerStyle : {}]}>{Header}</View>}
      {!!Body && <View style={!!Footer ? dividerStyle : {}}>{Body}</View>}
      {!!Footer && <View>{Footer}</View>}
    </View>
  );
}

export const Card = memo(withTailwind(CardComponent));
