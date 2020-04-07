import React from 'react';
import { View, Text, Icons } from 'shared';
import { StyleProp, ViewStyle } from 'react-native';
import { FeatherNameType } from 'types/FeatherNameType';
import styles from './styles';

export interface ReactionProps {
  countLike: number;
  nameIcon?: FeatherNameType;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Reaction({ countLike, nameIcon = 'heart', containerStyle }: ReactionProps) {
  return (
    <View flexDirection="row" alignItems="center" justifyContent="center" style={[containerStyle, styles.reactionWrap]} backgroundColor="light">
      <View backgroundColor="primary" alignItems="center" justifyContent="center" style={styles.reactionIcon}>
        <Icons.Feather name={nameIcon} size={12} color="light" />
      </View>
      <Text color="dark3" type="small" style={{ paddingHorizontal: 3 }}>
        {countLike}
      </Text>
    </View>
  );
}
