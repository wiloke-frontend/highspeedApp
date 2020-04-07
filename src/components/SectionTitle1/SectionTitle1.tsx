import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View, useTheme, Color } from 'shared';
import styles from './styles';

interface SectionTitle1Props {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  color?: Color;
}

function SectionTitle1({ text, containerStyle = {}, color = 'primary' }: SectionTitle1Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text type="h4" style={{ color: colors[color] }}>
        {text}
      </Text>
    </View>
  );
}

export default memo(SectionTitle1);
