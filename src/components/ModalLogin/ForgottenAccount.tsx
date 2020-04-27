import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, Keyboard } from 'react-native';
import { View, Text, FormCallbackParams } from 'shared';
import i18n from 'utils/functions/i18n';
import Form from 'components/Form/Form';
import IconBox from 'components/IconBox/IconBox';
import KeyboardSpacer from 'components/KeyboardSpacer/KeyboardSpacer';
import { useForgetPassword } from 'containers/Auth/actions/actionPassword';
import isIOS from 'shared/utils/isIOS';
import StatusBar from 'components/StatusBar/StatusBar';

export interface ForgottenAccountProps {
  visible: boolean;
  onClose: (visible: boolean) => void;
}

interface ForgetPassResult {
  username: string;
}

export default function ForgottenAccount({ visible, onClose }: ForgottenAccountProps) {
  const [isVisible, setVisible] = useState(visible);
  const [alert, setAlert] = useState({
    status: 'failure',
    message: '',
  });
  const forgetPassword = useForgetPassword();

  useEffect(() => {
    setVisible(visible);
  }, [onClose, visible]);

  const handleClose = () => {
    setVisible(false);
    onClose(false);
  };

  const renderMessage = (status: string, message: string) => {
    Keyboard.dismiss();
    setAlert({ status, message });
  };

  const _handleSubmit = (payload: FormCallbackParams<ForgetPassResult>) => {
    if (payload.valid) {
      forgetPassword({
        endpoint: 'forgot-password',
        body: {
          user_login: payload.result.username,
        },
        cb: renderMessage,
      });
    }
  };

  return (
    <Modal visible={isVisible} presentationStyle="fullScreen" animationType="slide" onRequestClose={handleClose}>
      <StatusBar />
      <View flex backgroundColor="light">
        <View alignItems="flex-end" safeAreaView tachyons={['pa3']}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleClose}>
            <IconBox name="x" color="light" backgroundColor="dark1" />
          </TouchableOpacity>
        </View>
        <View justifyContent="center" alignItems="center" tachyons={['mt3']}>
          <Text color="dark2" type="h2">
            {i18n.t('lostPassword')}
          </Text>
        </View>
        <View justifyContent="center">
          <View tachyons={['pa3']}>
            <Form
              fields={[
                {
                  name: 'username',
                  type: 'text',
                  placeholder: i18n.t('username'),
                  icon: 'user',
                  required: true,
                },
              ]}
              buttonText={i18n.t('reset')}
              onSubmit={_handleSubmit}
              buttonLoading={false}
            />
          </View>
          <View justifyContent="center" alignItems="center" tachyons={['ph3']}>
            <Text color={alert.status === 'success' ? 'success' : 'danger'}>{alert.message}</Text>
          </View>
        </View>
      </View>
      {isIOS ? <KeyboardSpacer /> : null}
    </Modal>
  );
}
