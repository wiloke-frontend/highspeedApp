import React, { ReactNode, memo, LegacyRef } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { View } from 'shared/components/View/View';
import styles from './styles';

type MyTextInputProps = Omit<TextInputProps, 'underlineColorAndroid' | 'style'>;

export interface InputBaseProps extends MyTextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputRef?: LegacyRef<TextInput>;
  Left?: ReactNode;
  Right?: ReactNode;
}

function defaultRenderProps() {
  return null;
}

function InputBaseComponent({
  containerStyle,
  inputStyle,
  Left = defaultRenderProps,
  Right = defaultRenderProps,
  inputRef,
  ...otherProps
}: InputBaseProps) {
  return (
    <View style={[styles.container, StyleSheet.flatten(containerStyle)]}>
      {Left}
      <TextInput
        {...otherProps}
        ref={inputRef}
        underlineColorAndroid="transparent"
        style={[styles.input, StyleSheet.flatten(inputStyle)]}
      />
      <View style={styles.rightItem}>{Right}</View>
    </View>
  );
}

export const InputBase = memo(InputBaseComponent);
