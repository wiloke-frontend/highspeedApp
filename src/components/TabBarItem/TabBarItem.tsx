import React, { memo } from 'react';
import { FeatherNameType } from 'types/FeatherNameType';
import styles from './styles';
import { useTheme, View, Text, Icons } from 'shared';
import { TabNavigatorItem } from 'api/TabNavigator';
import { useSelector } from 'react-redux';
import { notificationsSelector } from 'containers/NotifyScreen/selectors';
import configureApp from 'utils/constants/configureApp';
import { tabNavigatorSelector } from 'containers/AppContent/selectors';

interface TabBarItemProps {
  iconName: FeatherNameType | '';
  focused: boolean;
  labelName?: string;
  screen: TabNavigatorItem['screen'];
}

function TabBarItem({ iconName, labelName = '', focused, screen }: TabBarItemProps) {
  const notifications = useSelector(notificationsSelector);
  const tabNavigator = useSelector(tabNavigatorSelector);
  const { colors, styled } = useTheme();
  const iconStyleColor = focused ? colors.primary : colors.dark2;
  const labelStyle = focused ? styled.colorPrimary : styled.colorDark3;

  return (
    <>
      {configureApp.settings.bottomTabBarTopBorder && tabNavigator.data.length > 1 && (
        <View style={[styles.divider, focused ? styled.bgPrimary : {}]} />
      )}
      <View style={styles.container}>
        {!!iconName && <Icons.Feather name={iconName} size={22} style={styles.icon} colorNative={iconStyleColor} />}
        {!!labelName && (
          <Text numberOfLines={1} tachyons={['f7', 'mt1']} style={[labelStyle, styles.label]}>
            {labelName}
          </Text>
        )}
        {!!notifications.noSeenTotal && screen === 'NotifyNavigator' && (
          <View style={styles.badge} backgroundColor="danger">
            <Text type="small" colorNative="#fff">
              {notifications.noSeenTotal}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

export default memo(TabBarItem);
