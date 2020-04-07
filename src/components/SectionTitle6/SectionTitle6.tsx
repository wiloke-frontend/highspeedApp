import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View, useTheme, Color, Divider } from 'shared';
import styles from './styles';

interface SectionTitle6Props {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  color?: Color;
}

function SectionTitle6({ text, containerStyle = {}, color = 'primary' }: SectionTitle6Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors.gray2 }, containerStyle]}>
      <Text type="h5" style={{ color: colors[color] }}>
        {text}
      </Text>
      <Divider color="primary" style={styles.divider} />
    </View>
  );
}

export default memo(SectionTitle6);
