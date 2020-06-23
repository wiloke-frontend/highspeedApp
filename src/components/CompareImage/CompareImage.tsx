import React, { FC, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View, Image, useTheme } from 'shared';
import styles from './styles';

export interface CompareImageProps {
  beforeImageUri: string;
  afterImageUri: string;
  beforeText?: string;
  afterText?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const CompareImage: FC<CompareImageProps> = ({ beforeText = 'Before', afterText = 'After', containerStyle = {}, beforeImageUri, afterImageUri }) => {
  const { styled } = useTheme();

  return (
    <View style={containerStyle}>
      <View style={styles.imageWrap}>
        <Text style={[styles.text, styled.bgDark1, styled.colorGray2]}>{beforeText}</Text>
        <Image uri={beforeImageUri} />
      </View>
      <View style={styles.imageWrap}>
        <Text style={[styles.text, styled.bgDark1, styled.colorGray2]}>{afterText}</Text>
        <Image uri={afterImageUri} />
      </View>
    </View>
  );
};

export default memo(CompareImage);
