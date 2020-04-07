import React, { memo, FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View, useTheme, Color } from 'shared';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

interface SectionTitleProps {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  color?: Color;
  arrowRightEnabled?: boolean;
}

const SectionTitle: FC<SectionTitleProps> = ({ text, containerStyle = {}, color = 'primary', arrowRightEnabled = false }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text type="h5" style={{ color: colors[color] }}>
        {text}
      </Text>
      {arrowRightEnabled && <Feather name="chevron-right" size={22} color={colors[color]} />}
    </View>
  );
};

export default memo(SectionTitle);
