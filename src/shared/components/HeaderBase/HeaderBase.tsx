import React, { ReactNode, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View } from 'shared/components/View/View';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import styles from './styles';

export interface HeaderBaseProps {
  Left?: ReactNode;
  Center?: ReactNode;
  Right?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

function HeaderBaseComponent({ Left, Center, Right, containerStyle = {}, backgroundColor = '' }: HeaderBaseProps) {
  const { colors } = useTheme();
  const itemHasCenterStyle = Center ? styles.hasCenter : {};
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor || colors.light }, containerStyle]}>
      <View style={[styles.item, styles.left, itemHasCenterStyle]}>{Left}</View>
      {!!Center && <View style={[styles.item, styles.center]}>{Center}</View>}
      <View style={[styles.item, styles.right, itemHasCenterStyle]}>{Right}</View>
    </View>
  );
}

export const HeaderBase = memo(HeaderBaseComponent);
