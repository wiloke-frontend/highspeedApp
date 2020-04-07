import React, { memo, FC } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { FeatherNameType } from 'types/FeatherNameType';
import styles from './styles';
import { Color, useTheme, Icons } from 'shared';

interface IconBoxProps {
  name: FeatherNameType;
  color?: Color;
  backgroundColor?: Color;
  size?: 'medium' | 'small';
  style?: StyleProp<ViewStyle>;
}

const IconBox: FC<IconBoxProps> = ({ name, color = 'dark2', backgroundColor = 'gray1', size = 'medium', style = {} }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, styles[size], { backgroundColor: colors[backgroundColor] }, style]}>
      <Icons.Feather name={name} size={20} color={color} />
    </View>
  );
};

export default memo(IconBox);
