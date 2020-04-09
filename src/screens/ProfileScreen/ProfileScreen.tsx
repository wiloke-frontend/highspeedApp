import React, { useEffect } from 'react';
import { TouchableOpacity, Alert, ScrollView } from 'react-native';
import { View, Text, Container, Divider } from 'shared';
import { useSelector } from 'react-redux';
import HeaderSecondary from 'components/HeaderSecondary/HeaderSecondary';
import i18n from 'utils/functions/i18n';
import { authSelector } from 'store/selectors';
import { useLogOut } from 'store/storeAuth/actions/actionAuth';
import { StackScreenFC } from 'types/Navigation';
import List from 'components/List/List';
import { Link } from 'navigation';
import InterestCategories from './InterestCategories';
import Avatar from 'components/Avatar/Avatar';
import Layout from 'components/Layout/Layout';

const ProfileScreen: StackScreenFC<'ProfileScreen'> = ({ navigation }) => {
  const auth = useSelector(authSelector);
  const logout = useLogOut();

  const uri = auth.data?.avatar ?? 'https://thuatnguyencorp.com/uploads/product/thiet-ke-avatar-facebook-1.jpg';

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
    <Layout
      Header={
        <Container>
          <HeaderSecondary title={i18n.t('myProfile')} />
        </Container>
      }
      Content={
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
      }
    />
  );
};

export default ProfileScreen;
