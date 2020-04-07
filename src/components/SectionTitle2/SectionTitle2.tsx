import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View, useTheme, Divider, Color } from 'shared';
import styles from './styles';

interface SectionTitle2Props {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: Color;
  arrowRightEnabled?: boolean;
}

function SectionTitle2({ text, containerStyle = {}, backgroundColor = 'primary' }: SectionTitle2Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <View flexDirection="row">
        <View style={[styles.textWrapper, { backgroundColor: colors[backgroundColor] }]}>
          <Text type="h6" color="light">
            {text}
          </Text>
        </View>
      </View>
      <Divider color="primary" style={styles.divider} />
    </View>
  );
}

export default memo(SectionTitle2);
