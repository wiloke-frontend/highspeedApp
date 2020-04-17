import React, { FC, ReactNode } from 'react';
import { View, Text, Icons } from 'shared';
import { FeatherNameType } from 'shared/types/FeatherNameType';
import { StyleSheet } from 'react-native';

export interface ListProps {
  text: string;
  iconName?: FeatherNameType | '';
  Right?: ReactNode;
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
  },
});

const List: FC<ListProps> = ({ text, iconName, Right = <Icons.Feather name="chevron-right" size={20} color="dark3" /> }) => {
  return (
    <View flexDirection="row" alignItems="center" justifyContent="space-between" tachyons="pa3">
      <View flexDirection="row" alignItems="center">
        {!!iconName && (
          <View tachyons="mr1" style={styles.icon}>
            <Icons.Feather name={iconName} size={18} color="dark2" />
          </View>
        )}
        <Text>{text}</Text>
      </View>
      {Right}
    </View>
  );
};

export default List;
