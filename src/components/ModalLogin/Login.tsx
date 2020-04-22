import React, { FC } from 'react';
import { View, Button, Text, FormCallbackPropsType } from 'shared';
import Form from 'components/Form/Form';
import { styles } from './styles';
import i18n from 'utils/functions/i18n';
import LoginWith from './LoginWith';

export interface LoginResult {
  username: string;
  password: string;
}

export interface LoginProps {
  onLogin: FormCallbackPropsType<LoginResult>;
  isLoading?: boolean;
  onChangeForm?: () => void;
  onForget?: () => void;
}

const Login: FC<LoginProps> = ({ onLogin, isLoading, onChangeForm, onForget }) => {
  return (
    <View justifyContent="space-between" backgroundColor="light" tachyons="ph2" style={styles.content}>
      <View>
        <View flexDirection="row" justifyContent="center" alignItems="center" tachyons="mb3">
          <Text type="h4" tachyons="tc">
            {i18n.t('login')}
          </Text>
        </View>
        <Form
          fields={[
            {
              name: 'username',
              type: 'text',
              placeholder: i18n.t('username'),
              icon: 'user',
            },
            {
              name: 'password',
              type: 'password',
              placeholder: i18n.t('password'),
              icon: 'lock',
            },
          ]}
          buttonText={i18n.t('login')}
          onSubmit={onLogin}
          buttonLoading={isLoading}
        />
        <LoginWith />
        <Button backgroundColor="transparent" block size="medium" justifyContent="center" alignItems="center" onPress={onForget}>
          <Text>{i18n.t('lostPassword')}</Text>
        </Button>
      </View>
      <View tachyons={['mt2', 'justifyEnd']}>
        <Button block tachyons={['wAuto', 'mt2', 'br2']} backgroundColor="gray3" onPress={onChangeForm}>
          <Text>{i18n.t('register')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;
