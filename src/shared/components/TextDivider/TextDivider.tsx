import React, { memo, ReactNode } from 'react';
import { View, Text, StyleProp, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import styles from './styles';
import { tailwindStyles } from 'shared/themes/tailwind';

export interface TextDividerProps {
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}

function TextDividerComponennt({ textStyle = {}, containerStyle = {}, children }: TextDividerProps) {
  const { styled } = useTheme();
  return (
    <View style={[styles.container, StyleSheet.flatten(containerStyle)]}>
      <View style={[styles.divider, styled.bgDark4]}></View>
      <View style={styles.textWrap}>
        <Text style={[tailwindStyles['text-sm'], styled.colorDark3, StyleSheet.flatten(textStyle)]}>{children}</Text>
      </View>
      <View style={[styles.divider, styled.bgDark4]}></View>
    </View>
  );
}

export const TextDivider = memo(TextDividerComponennt);
