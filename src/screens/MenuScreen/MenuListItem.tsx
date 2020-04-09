import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import List from 'components/List/List';
import { Divider } from 'shared';
import { MenuItem } from 'api/Menu';
import * as WebBrowser from 'expo-web-browser';
import { useSelector } from 'react-redux';
import { isLoggedInSelector } from 'store/selectors';
import { onOpenModalLogin } from 'components/ModalLogin/ModalLogin';
import { useNavigation } from '@react-navigation/native';

export interface MenuListItemProps {
  item: MenuItem;
  index: number;
}

const MenuListItem: FC<MenuListItemProps> = ({ item, index }) => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector(isLoggedInSelector);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (item?.type === 'screen') {
          if (!isLoggedIn && item.screen === 'MenuProfileScreen') {
            onOpenModalLogin();
          } else {
            navigation.navigate(item.screen, {
              backButtonEnabled: true,
              title: item.label,
            });
          }
        } else if (item?.type === 'webview') {
          const link = item.screen.includes('http') ? item.screen : `https://${item.screen}`;
          WebBrowser.openBrowserAsync(link);
        }
      }}
    >
      {index === 0 && <Divider />}
      <List iconName={item?.iconName} iconColor={item?.iconColor} text={item?.label ?? ''} />
      <Divider />
    </TouchableOpacity>
  );
};

export default MenuListItem;
