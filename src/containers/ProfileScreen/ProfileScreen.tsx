import React, { useEffect } from 'react';
import { TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import { View, Text, Container, Divider, useTheme } from 'shared';
import { useSelector } from 'react-redux';
import HeaderSecondary from 'components/HeaderSecondary/HeaderSecondary';
import i18n from 'utils/functions/i18n';
import { authSelector } from 'containers/Auth/selectors';
import { nightModeSelector } from 'containers/ProfileScreen/selectors';
import { useLogOut } from 'containers/Auth/actions/actionAuth';
import List from 'components/List/List';
import { Link, ScreenFC } from 'navigation';
import InterestCategories from './InterestCategories';
import Avatar from 'components/Avatar/Avatar';
import { useChangeNightMode } from './actions/actionNightMode';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';
import isAndroid from 'shared/utils/isAndroid';

const ProfileScreen: ScreenFC = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = useSelector(authSelector);
  const nightMode = useSelector(nightModeSelector);
  const changeNightMode = useChangeNightMode();
  const logout = useLogOut();
  const uri = auth.data?.avatar ?? '';

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigation.navigate('HomeScreen');
    }
  }, [auth.isLoggedIn, navigation]);

  const _handleLogout = () => {
    Alert.alert(
      i18n.t('logout'),
      i18n.t('logoutQuestion'),
      [
        {
          text: i18n.t('no'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: i18n.t('ok'), onPress: () => logout() },
      ],
      { cancelable: false },
    );
  };

  return (
    <ScreenContainer
      Header={
        <Container>
          <HeaderSecondary title={i18n.t('myProfile')} />
        </Container>
      }
      safeAreaView
    >
      <ScrollView>
        <Container>
          <View alignItems="center" tachyons="pv4">
            <Avatar uri={uri} size={80} name={auth.data.displayName} />
            <View tachyons="mt1">
              <Text type="h7" tachyons="tc">
                {auth.data.displayName}
              </Text>
            </View>
          </View>
          <Divider />
          <InterestCategories />
          <Divider />
          <List
            iconName="moon"
            text={i18n.t('nightMode')}
            Right={
              <Switch
                value={nightMode}
                onValueChange={() => changeNightMode()}
                trackColor={{ true: isAndroid ? colors.gray1 : colors.primary, false: colors.gray2 }}
                {...(isAndroid ? { thumbColor: nightMode ? colors.primary : colors.gray1 } : {})}
              />
            }
          />
          <Divider />
          <Link to="HistoryPostsScreen">
            <List iconName="clock" text={i18n.t('history')} />
            <Divider />
          </Link>
          <Link to="ChangePasswordScreen">
            <List iconName="lock" text={i18n.t('changePassword')} />
          </Link>
          <Divider />
          <Link to="PostsScreen" params={{ name: i18n.t('favoritePosts'), requestParams: { is_my_favorites: 'yes' } }}>
            <List iconName="heart" text={i18n.t('favoritePosts')} />
            <Divider />
          </Link>
          <TouchableOpacity onPress={_handleLogout}>
            <List iconName="log-out" text={i18n.t('logout')} />
          </TouchableOpacity>
          <Divider />
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;
