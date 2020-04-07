import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View, useTheme, Color } from 'shared';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

interface SectionTitle5Props {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  color?: Color;
  arrowRightEnabled?: boolean;
}

function SectionTitle5({ text, containerStyle = {}, color = 'primary', arrowRightEnabled = false }: SectionTitle5Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors[color] }, containerStyle]}>
      <Text type="h5" style={{ color: colors[color] }}>
        {text}
      </Text>
      {arrowRightEnabled && <Feather name="chevron-right" size={22} color={colors[color]} />}
    </View>
  );
}

export default memo(SectionTitle5);
