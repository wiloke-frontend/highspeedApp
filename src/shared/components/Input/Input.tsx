import React, { useState, ReactNode } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import styles from './styles';
import { InputBase, InputBaseProps } from 'shared/components/InputBase/InputBase';
import { Icons } from 'shared/components/Icons/Icons';
import { BaseButton } from 'react-native-gesture-handler';
import { BorderWidth, BorderRadius, Color } from 'shared/types/types';
import { useTheme } from '../ThemeContext/ThemeContext';
import { View } from 'shared/components/View/View';
import getBorderRadiusStyle from 'shared/utils/getBorderRadiusStyle';
import getBorderWidthStyle from 'shared/utils/getBorderWidthStyle';
import { tachyonsStyles } from 'shared/themes/tachyons';

export interface InputProps extends InputBaseProps {
  ClearButtonModeComponent?: ReactNode;
  backgroundColor?: Color;
  borderRadius?: BorderRadius;
  color?: Color;
  borderColor?: Color;
  borderWidth?: BorderWidth;
  onClearText?: InputBaseProps['onChangeText'];
  onFocusText?: InputBaseProps['onChangeText'];
  onFocus?: InputBaseProps['onFocus'];
}

export function Input({
  onChangeText,
  onFocusText,
  onFocus,
  onClearText = () => {},
  containerStyle,
  inputStyle,
  clearButtonMode = 'never',
  ClearButtonModeComponent,
  placeholder = '',
  borderRadius = 'round',
  borderWidth = 1,
  color = 'dark1',
  backgroundColor = 'light',
  borderColor = 'dark4',
  Left,
  Right,
  ...otherProps
}: InputProps) {
  const [value, setValue] = useState('');
  const { colors, sizes } = useTheme();
  const inputHasLeftStyle = !!Left ? styles.hasLeft : {};
  const inputHasRightStyle = !!Left ? styles.hasRight : {};

  const _handleChangeText = (text: string) => {
    setValue(text);
    onChangeText?.(text);
  };

  const _handleClearText = () => {
    setValue('');
    onClearText('');
  };

  const _handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocusText?.(event.nativeEvent.text);
    onFocus?.(event);
  };

  const ClearButton = (
    <BaseButton style={[tachyonsStyles.justifyCenter, tachyonsStyles.itemsCenter]} onPress={_handleClearText}>
      {ClearButtonModeComponent ?? <Icons.Feather name="x" color="dark3" size={sizes.base * 1.4} style={[tachyonsStyles.pv2, tachyonsStyles.pr2]} />}
    </BaseButton>
  );

  const checkClearMode: { [K in typeof clearButtonMode]: ReactNode } = {
    always: ClearButton,
    'while-editing': ClearButton,
    'unless-editing': null,
    never: null,
  };

  return (
    <InputBase
      {...otherProps}
      value={value}
      onChangeText={_handleChangeText}
      onFocus={_handleFocus}
      placeholder={placeholder}
      Left={<View>{Left}</View>}
      Right={[<View key="item1">{Right}</View>, <View key="item2">{!!value && checkClearMode[clearButtonMode]}</View>]}
      inputStyle={[styles.input, inputHasLeftStyle, inputHasRightStyle, { color: colors[color] }, inputStyle]}
      containerStyle={[
        getBorderRadiusStyle(borderRadius),
        getBorderWidthStyle(borderWidth),
        { backgroundColor: colors[backgroundColor], borderColor: colors[borderColor] },
        containerStyle,
      ]}
    />
  );
}
