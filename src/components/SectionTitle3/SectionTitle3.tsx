import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View, useTheme, Color } from 'shared';
import styles from './styles';

interface SectionTitle3Props {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: Color;
  arrowRightEnabled?: boolean;
}

function SectionTitle3({ text, containerStyle = {}, backgroundColor = 'primary' }: SectionTitle3Props) {
  const { colors, styled } = useTheme();

  return (
    <View tachyons="mb2" style={[styled.bgGray2, containerStyle]}>
      <View flexDirection="row">
        <View justifyContent="center" style={[styles.textWrapper, { backgroundColor: colors[backgroundColor] }]}>
          <Text type="h6" colorNative="#fff">
            {text}
          </Text>
        </View>
        <View style={[styles.triangle, { borderLeftColor: colors[backgroundColor] }]} />
      </View>
    </View>
  );
}

export default memo(SectionTitle3);
