import React from 'react';
import { View, Button, Text, FormCallbackPropsType } from 'shared';
import Form from 'components/Form/Form';
import { styles } from './styles';
import i18n from 'utils/functions/i18n';
import LoginWith from './LoginWith';
import { getConstraintsRegister } from './constraints';

export interface RegisterProps<ResultT> {
  onRegister: FormCallbackPropsType<ResultT>;
  isLoading?: boolean;
  onChangeForm?: () => void;
}

function Register<ResultT>({ onRegister, onChangeForm, isLoading }: RegisterProps<ResultT>) {
  return (
    <View backgroundColor="light" tachyons="ph2" style={styles.content}>
      <View flexDirection="row" justifyContent="center" alignItems="center" tachyons="mb3">
        <Text type="h4" tachyons="tc">
          {i18n.t('register')}
        </Text>
      </View>
      <Form
        fields={[
          {
            name: 'user_email',
            type: 'text',
            placeholder: i18n.t('email'),
            icon: 'mail',
            required: true,
          },
          {
            name: 'user_register',
            type: 'text',
            placeholder: i18n.t('username'),
            icon: 'user',
            required: true,
          },
          {
            name: 'password_register',
            type: 'password',
            placeholder: i18n.t('password'),
            icon: 'lock',
            required: true,
          },
        ]}
        constraints={getConstraintsRegister()}
        buttonText={i18n.t('register')}
        onSubmit={onRegister}
        buttonLoading={isLoading}
      />
      <LoginWith />

      <View tachyons="mt2">
        <Button block tachyons={['wAuto', 'mt2', 'br2']} backgroundColor="gray3" onPress={onChangeForm}>
          <Text>{i18n.t('login')}</Text>
        </Button>
      </View>
    </View>
  );
}

export default Register;
