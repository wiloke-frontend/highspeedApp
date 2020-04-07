import React from 'react';
import { View } from 'shared/components/View/View';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import { Color } from 'shared/types/types';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { withTailwind } from 'shared/hocs/withTailwind';

export interface DividerProps {
  color?: Color;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: {
    height: 1,
  },
});

export const Divider = withTailwind(({ color = 'gray2', style }: DividerProps) => {
  const { colors } = useTheme();
  return <View style={[styles.container, { backgroundColor: colors[color] }, style]} />;
});
