import React from 'react';
import { View, Button, Text, TextDivider, Icons, Toast, useTheme } from 'shared';
import i18n from 'utils/functions/i18n';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Facebook from 'expo-facebook';
import Constants from 'expo-constants';
import axios from 'axios';
import { useFacebookLogin, useLoginApple, Authentication } from 'containers/Auth/actions/actionAuth';
import { useSelector } from 'react-redux';
import { authSelector } from 'containers/Auth/selectors';
import { onCloseModalLogin } from './ModalLogin';
import { alertMessage } from './utils/alertMessage';
import { isEmpty } from 'ramda';
import { notificationsSelector } from 'containers/NotifyScreen/selectors';
import { useGetNotificationsRequest } from 'containers/NotifyScreen/actions/actionNotifications';
import { styles } from './styles';
import { Platform } from 'react-native';
import isIOS from 'shared/utils/isIOS';

export interface LoginWithProps {
  appID?: string;
}

const majorVersionIOS: number = typeof Platform.Version === 'string' ? parseInt(Platform.Version, 10) : Platform.Version;

const LoginWith = ({ appID = '2759040360883740' }: LoginWithProps) => {
  const loginFacebook = useFacebookLogin();
  const loginApple = useLoginApple();
  const getNotificationsRequest = useGetNotificationsRequest();
  const auth = useSelector(authSelector);
  const notifications = useSelector(notificationsSelector);
  const { styled } = useTheme();

  const callbackLogin = (authen: Authentication) => {
    if (authen.isLoggedIn) {
      onCloseModalLogin();
      Toast.show({
        content: <Text color="light">{authen?.data.msg}</Text>,
        style: [styled.bgSuccess],
        animationType: 'slide-up',
      });
      if (isEmpty(notifications.data)) {
        getNotificationsRequest({
          endpoint: 'notifications',
          params: { page: 1, postsPerPage: 20 },
        });
      }
    } else {
      alertMessage(authen.message);
    }
  };

  const _handleLoginFacebook = async () => {
    try {
      await Facebook.initializeAsync(appID, Constants.manifest.facebookDisplayName);
      await Facebook.setAutoInitEnabledAsync(true);
      const res = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (res.type === 'success') {
        const { data } = await axios.get(`https://graph.facebook.com/me?access_token=${res.token}&fields=id,name,email`);
        console.log({ data });
        loginFacebook({
          endpoint: 'facebook/app-signin',
          body: {
            accessToken: res.token,
          },
          cb: callbackLogin,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const _handleLoginApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
      });
      loginApple({
        endpoint: 'apple/verify-login',
        body: {
          code: credential.authorizationCode,
          token: credential.identityToken,
          email: credential.email,
        },
        cb: callbackLogin,
      });

      // signed in
    } catch (e) {
      console.log(e.code);
    }
  };

  return (
    <View>
      <TextDivider>{i18n.t('or')}</TextDivider>
      <Button
        block
        tachyons={['wAuto', 'mt1', 'br2']}
        backgroundColor="facebook"
        onPress={_handleLoginFacebook}
        loading={auth.statusFacebook === 'loading'}
      >
        <View tachyons="mr1">
          <Icons.Feather name="facebook" size={18} colorNative="#fff" />
        </View>
        <Text style={styles.colorLight}>Login with Facebook</Text>
      </Button>
      {isIOS && majorVersionIOS > 13 && (
        <Button
          block
          tachyons={['wAuto', 'mt2', 'br2']}
          loading={auth.statusApple === 'loading'}
          style={styles.appleButton}
          onPress={_handleLoginApple}
        >
          <View tachyons="mr1">
            <Icons.FontAwesome5 name="apple" size={18} colorNative="#fff" />
          </View>
          <Text style={styles.colorLight}>Login with Apple</Text>
        </Button>
      )}
    </View>
  );
};

export default LoginWith;
