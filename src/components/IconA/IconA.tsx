import React, { FC } from 'react';
import { View, Text, Color } from 'shared';
import { StyleProp, ViewStyle } from 'react-native';

interface IconAProps {
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'medium' | 'large';
  color?: Color;
}

const getSize = (size: IconAProps['size']) => {
  switch (size) {
    case 'large':
      return 24;
    case 'small':
      return 16;
    default:
    case 'medium':
      return 20;
  }
};

const IconA: FC<IconAProps> = ({ style, size = 'medium', color }) => {
  const size1 = getSize(size);
  const size2 = size1 - 4;
  return (
    <View flexDirection="row" flexWrap="nowrap" alignItems="flex-end" style={style}>
      <Text size={size2} color={color}>
        A
      </Text>
      <Text size={size1} color={color} style={{ lineHeight: 24 }}>
        A
      </Text>
    </View>
  );
};

export default IconA;
