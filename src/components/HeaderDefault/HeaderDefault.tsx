import React, { memo, FC } from 'react';
import { useSelector } from 'react-redux';
import { sizeBase } from 'utils/constants/base';
import { Icons, HeaderBase, View, Text, OfflineNotice } from 'shared';
import { Animated, TouchableOpacity } from 'react-native';
import { onOpenModalLogin } from 'components/ModalLogin/ModalLogin';
import Logo from 'components/Logo/Logo';
import useHeaderAnimated from 'shared/hooks/useAnimation';
import { Link } from 'navigation';
import { tabNavigatorSelector, userAvatarSelector, isLoggedInSelector, userNameSelector } from 'store/selectors';
import BackButton from 'components/BackButton/BackButton';
import Avatar from 'components/Avatar/Avatar';
import i18n from 'utils/functions/i18n';
import { useNavigation, useRoute } from '@react-navigation/native';

export interface HeaderDefaultProps {
  title?: string;
  backButtonEnabled?: boolean;
}

const HeaderDefault: FC<HeaderDefaultProps> = ({ title = '', backButtonEnabled = false }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const avatar = useSelector(userAvatarSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const name = useSelector(userNameSelector);
  const { opacityText } = useHeaderAnimated();
  const tabNavigator = useSelector(tabNavigatorSelector);
  // const parentRouteName = !!navigation ? navigation.dangerouslyGetParent()?.state.routeName ?? '' : '';
  // const _title = !!title ? title : !!navigation ? tabNavigator.data.find(item => item.name === parentRouteName)?.label : '';
  const parentRouteName = '';
  const _title = '';

  const handleOpenModal = () => {
    onOpenModalLogin();
  };

  return (
    <View style={{ height: 50 }}>
      <HeaderBase
        Left={[
          backButtonEnabled && <BackButton key="item1" tachyons={['pa1', 'nl2', 'mr2']} />,
          !!_title && parentRouteName !== 'home' ? (
            <Text key="item2" type="h4">
              {_title}
            </Text>
          ) : (
            <Animated.View key="item2" style={{ opacity: opacityText }}>
              <Logo />
            </Animated.View>
          ),
        ]}
        Right={[
          <View key="item1" tachyons="mr2">
            <Link to="SearchScreen" params={{ backButtonEnabled: true }} activeOpacity={0.7} tachyons="pa1">
              <Icons.Feather name="search" size={sizeBase * 1.5} color="dark2" />
            </Link>
          </View>,
          isLoggedIn ? (
            <Link key="item2" to="ProfileScreen" activeOpacity={0.8}>
              <Avatar uri={avatar} size={25} name={name} />
            </Link>
          ) : (
            <TouchableOpacity key="item2" onPress={handleOpenModal}>
              <View justifyContent="center" alignItems="center" tachyons={['w2', 'h2']}>
                <Icons.Feather name="user" size={sizeBase * 1.5} color="dark2" />
              </View>
            </TouchableOpacity>
          ),
        ]}
      />
      <OfflineNotice>{i18n.t('noInternet')}</OfflineNotice>
    </View>
  );
};

export default memo(HeaderDefault);
