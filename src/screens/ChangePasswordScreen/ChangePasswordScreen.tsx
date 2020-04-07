import React, { useState } from 'react';
import { StackScreenFC } from 'types/Navigation';
import { View, Text, Container, HeaderBase, FormCallbackParams, Toast, useTheme } from 'shared';
import isIOS from 'shared/utils/isIOS';
import i18n from 'utils/functions/i18n';
import BackButton from 'components/BackButton/BackButton';
import Form from 'components/Form/Form';
import getConstraints from './constraint';
import { Alert, Keyboard, ScrollView } from 'react-native';
import { alertMessage } from 'components/ModalLogin/utils/alertMessage';
import { useSelector } from 'react-redux';
import { useChangePassword } from 'store/storeAuth/actions/actionAuth';
import { authSelector } from 'store/selectors';

export interface ChangePasswordResult {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
}

const ChangePasswordScreen: StackScreenFC = ({ navigation }) => {
  const [error, setError] = useState('');
  const changePassword = useChangePassword();
  const auth = useSelector(authSelector);
  const { styled } = useTheme();

  const _handleAlert = (status: string, message: string) => {
    if (status === 'success') {
      navigation.goBack();
      Toast.show({
        content: <Text color="light">{message}</Text>,
        style: [styled.bgSuccess],
        animationType: 'slide-up',
      });
    } else {
      alertMessage(message);
    }
  };

  const _handleSubmit = (payload: FormCallbackParams<ChangePasswordResult>) => {
    Keyboard.dismiss();
    if (payload.valid) {
      if (payload.result.newpassword !== payload.result.confirmpassword) {
        Alert.alert(i18n.t('matchPassword'));
        return;
      }
      changePassword({
        endpoint: 'change-password',
        body: {
          oldPassword: payload.result.oldpassword,
          newPassword: payload.result.newpassword,
          confirmPassword: payload.result.confirmpassword,
        },
        cb: _handleAlert,
      });
    }
  };

  const _handleChangeResult = (payload: FormCallbackParams<ChangePasswordResult>) => {
    if (payload.result['newpassword'] !== payload.result['confirmpassword']) {
      setError(i18n.t('matchPassword'));
    } else setError('');
  };

  return (
    <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
      <View safeAreaView={isIOS} flex>
        <Container>
          <HeaderBase
            Left={<BackButton tachyons={['pa1', 'nl2', 'mr2']} />}
            Center={
              <View tachyons={['itemsCenter', 'w70']}>
                <Text type="h7" numberOfLines={1}>
                  {i18n.t('changePassword')}
                </Text>
              </View>
            }
          />
          <View tachyons={['pa3']}>
            <Form
              fields={[
                {
                  name: 'oldpassword',
                  type: 'password',
                  placeholder: i18n.t('currentPassword'),
                  required: true,
                },
                {
                  name: 'newpassword',
                  type: 'password',
                  placeholder: i18n.t('newPassword'),
                  required: true,
                },
                {
                  name: 'confirmpassword',
                  type: 'password',
                  placeholder: i18n.t('confirmPassword'),
                  required: true,
                },
              ]}
              constraints={getConstraints()}
              buttonText={i18n.t('save')}
              onSubmit={_handleSubmit}
              buttonLoading={auth.statusChangePassword === 'loading'}
              onChangeResult={_handleChangeResult}
              customText={() => (
                <View
                  tachyons={['mb2']}
                  style={{
                    transform: [
                      {
                        translateY: -10,
                      },
                    ],
                  }}
                >
                  <Text color="danger">{error}</Text>
                </View>
              )}
            />
          </View>
        </Container>
      </View>
    </ScrollView>
  );
};
export default ChangePasswordScreen;
