import React, { ReactNode, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import styles from './styles';

export interface HeaderBaseProps {
  Left?: ReactNode;
  Center?: ReactNode;
  Right?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  debug?: boolean;
}

function HeaderBaseComponent({ Left, Center, Right, containerStyle = {}, backgroundColor = '', debug = false }: HeaderBaseProps) {
  const { colors } = useTheme();
  const debugStyle = debug ? styles.debug : {};
  const itemHasCenterStyle = Center ? styles.hasCenter : {};
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || colors.light }, containerStyle, debugStyle]}>
      <View style={[styles.item, styles.left, itemHasCenterStyle, debugStyle]}>{Left}</View>
      {!!Center && <View style={[styles.item, styles.center, debugStyle]}>{Center}</View>}
      <View style={[styles.item, styles.right, itemHasCenterStyle, debugStyle]}>{Right}</View>
    </View>
  );
}

export const HeaderBase = memo(HeaderBaseComponent);
