import React, { memo, FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { sizeBase } from 'utils/constants/base';
import { Icons, HeaderBase, View, Text, OfflineNotice } from 'shared';
import { tabNavigatorSelector } from 'store/selectors';
import { NavigationRoute, withNavigation } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { Link } from 'navigation';
import BackButton from 'components/BackButton/BackButton';
import i18n from 'utils/functions/i18n';

export interface HeaderCatFollowProps {
  title?: string;
  backButtonEnabled?: boolean;
  navigation: NavigationStackProp<NavigationRoute, {}>;
  onEditing?: TouchableOpacityProps['onPress'];
}

const HeaderCatFollow: FC<HeaderCatFollowProps> = ({ title = '', backButtonEnabled = false, onEditing, navigation }) => {
  const tabNavigator = useSelector(tabNavigatorSelector);
  const parentRouteName = !!navigation ? navigation.dangerouslyGetParent()?.state.routeName : '';
  const _title = !!title ? title : !!navigation ? tabNavigator.data.find(item => item.name === parentRouteName)?.label : '';

  return (
    <>
      <HeaderBase
        Left={[
          backButtonEnabled && <BackButton key="item1" tachyons={['pa1', 'nl2', 'mr2']} />,
          <Text key="item2" type="h4">
            {_title}
          </Text>,
        ]}
        Right={[
          <View key="item1" tachyons="mr2">
            <Link to="SearchScreen" params={{ backButtonEnabled: true }} activeOpacity={0.7} tachyons="pa1">
              <Icons.Feather name="search" size={sizeBase * 1.5} color="dark2" />
            </Link>
          </View>,
          <TouchableOpacity key="item2" activeOpacity={0.7} onPress={onEditing}>
            <View justifyContent="center" alignItems="center" tachyons={['w2', 'h2']}>
              <Icons.Feather name="plus-circle" size={sizeBase * 1.5} color="dark2" />
            </View>
          </TouchableOpacity>,
        ]}
      />
      <OfflineNotice>{i18n.t('noInternet')}</OfflineNotice>
    </>
  );
};

export default memo(withNavigation(HeaderCatFollow));
