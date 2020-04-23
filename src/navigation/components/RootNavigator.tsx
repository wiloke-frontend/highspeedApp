import React from 'react';
import ConfigNavigator from './ConfigNavigator';
import { ModalLogin, RegisterResult, onCloseModalLogin } from 'components/ModalLogin/ModalLogin';
import { View, FormCallbackParams, useTheme, useMount, Toast, Text } from 'shared';
import { useSelector } from 'react-redux';
import { useAuthentication, Authentication, BodyRequest } from 'store/storeAuth/actions/actionAuth';
import { authSelector, isLoggedInSelector } from 'store/selectors';
import { useGetTabNavigatorRequest } from 'store/storeTabNavigator/actions';
import { Alert } from 'react-native';
import { LoginResult } from 'components/ModalLogin/Login';
import { useGetNotificationsRequest } from 'screens/NotifyScreen/actions/actionNotifications';
import i18n from 'utils/functions/i18n';
import { useGetPostsWithCatSelected } from 'screens/SelectCatScreen/actions/actionGetPostsWithCatSelected';
import { useGetCategoriesFollowed } from 'store/storeCategories/actions/actionFollowCategory';
import ModalAppUpdate from 'components/ModalAppUpdate/ModalAppUpdate';
import configureApp from 'utils/constants/configureApp';
import { useGetNotificationTotal } from 'store/storeNotificationTotal/actionNotificationTotal';

export default function RootNavigator() {
  const getTabNavigator = useGetTabNavigatorRequest();
  const authentication = useAuthentication();
  const getNotificationsRequest = useGetNotificationsRequest();
  const getPostsWithCatSelected = useGetPostsWithCatSelected();
  const getCategoriesFollowed = useGetCategoriesFollowed();
  const getNotificationTotal = useGetNotificationTotal();
  const auth = useSelector(authSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const { styled } = useTheme();

  useMount(() => {
    getTabNavigator({ endpoint: 'tab-navigators' });
    if (isLoggedIn) {
      getNotificationTotal.request({ endpoint: 'notification-total?seen=no' });
    }
  });

  const _handleRetry = (request: BodyRequest) => {
    if (!!request.user_email) {
      authentication({
        endpoint: 'signup',
        body: {
          user_login: request.user_login,
          user_password: request.user_password,
          user_email: request.user_email,
        },
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        cb: callBackLogin,
      });
    } else {
      authentication({
        endpoint: 'signin',
        body: {
          user_login: request.user_login,
          user_password: request.user_password,
        },
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        cb: callBackLogin,
      });
    }
  };

  const callBackLogin = (authen: Authentication, request: BodyRequest) => {
    if (isLoggedIn) {
      onCloseModalLogin();
      Toast.show({
        content: <Text color="light">{authen?.data.msg}</Text>,
        style: [styled.bgSuccess],
        animationType: 'slide-up',
      });
      getNotificationsRequest({
        endpoint: 'notifications',
        params: { page: 1, postsPerPage: 20 },
      });
      getNotificationTotal.request({ endpoint: 'notification-total?seen=no' });
    } else {
      Alert.alert(
        i18n.t('warning'),
        authen.message,
        [
          {
            text: i18n.t('ok'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: i18n.t('retry'), onPress: () => _handleRetry(request) },
        ],
        { cancelable: false },
      );
    }
    if (isLoggedIn) {
      getCategoriesFollowed.request({
        endpoint: 'categories/following',
        callback: categoriesSelectedIds => {
          getPostsWithCatSelected.request({
            endpoint: 'search',
            params: {
              taxonomies: { category: categoriesSelectedIds },
              page: 1,
              postsPerPage: 20,
            },
          });
        },
      });
    }
  };

  const _handleLogin = (payload: FormCallbackParams<LoginResult>) => {
    if (payload.valid) {
      authentication({
        endpoint: 'signin',
        body: {
          user_login: payload.result.username,
          user_password: payload.result.password,
        },
        cb: callBackLogin,
      });
    }
  };

  const _handleRegister = (payload: FormCallbackParams<RegisterResult>) => {
    if (payload.valid) {
      authentication({
        endpoint: 'signup',
        body: {
          user_login: payload.result.user_register,
          user_password: payload.result.password_register,
          user_email: payload.result.user_email,
        },
        cb: callBackLogin,
      });
    }
  };

  return (
    <View flex>
      <ModalLogin onLogin={_handleLogin} onRegister={_handleRegister} isLoading={auth?.status === 'loading'} message={auth?.message} />
      <ModalAppUpdate
        text={configureApp.settings.applicationUpdateMessage}
        buttonUpdateText={i18n.t('updateNow')}
        moreText={i18n.t('seeMoreUpdateDetails')}
      />
      <ConfigNavigator />
    </View>
  );
}
