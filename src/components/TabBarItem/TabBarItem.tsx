import React, { memo } from 'react';
import { FeatherNameType } from 'types/FeatherNameType';
import styles from './styles';
import { useTheme, View, Text, Icons } from 'shared';

interface TabBarItemProps {
  iconName: FeatherNameType | '';
  focused: boolean;
  labelName?: string;
}

function TabBarItem({ iconName, labelName = '', focused }: TabBarItemProps) {
  const { colors, styled } = useTheme();
  const iconStyleColor = focused ? colors.primary : colors.dark2;
  const labelStyle = focused ? styled.colorPrimary : styled.colorDark3;

  return (
    <View safeAreaViewBottom tachyons="bt" style={[styles.container, styled.bgLight, { borderTopColor: colors.gray3 }]}>
      {!!iconName && <Icons.Feather name={iconName} size={22} style={styles.icon} colorNative={iconStyleColor} />}
      {!!labelName && (
        <Text numberOfLines={1} tachyons={['f7', 'mt1']} style={[labelStyle, styles.label]}>
          {labelName}
        </Text>
      )}
    </View>
  );
}

export default memo(TabBarItem);
