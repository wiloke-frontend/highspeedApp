import React, { FC } from 'react';
import { View, Text, Image, useMount } from 'shared';
import IconBox from 'components/IconBox/IconBox';
import { styles } from './styles';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface SelectCardProps {
  imageUri: string;
  imagePreview?: string;
  text: string;
  isActive?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  onMount?: () => void;
}

const SelectCard: FC<SelectCardProps> = ({ imageUri, imagePreview, isActive = false, text, onPress, onMount }) => {
  const iconBgColor = isActive ? 'primary' : 'gray2';
  const iconColor = isActive ? 'light' : 'dark1';

  useMount(() => {
    onMount?.();
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.content}>
        <Image uri={imageUri} preview={imagePreview} percentRatio="56.25%" />
        <View justifyContent="center" alignItems="center" tachyons={['absolute', 'absoluteFill', 'z1']}>
          <View tachyons={['absolute', 'absoluteFill', 'z1']} style={styles.overlay} />
          <Text type="h7" tachyons="tc" style={styles.text} numberOfLines={1}>
            {text}
          </Text>
          <View style={styles.check}>
            <IconBox name={isActive ? 'check' : 'plus'} size="small" backgroundColor={iconBgColor} color={iconColor} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SelectCard;
