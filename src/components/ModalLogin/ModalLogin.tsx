import React, { useState, useRef } from 'react';
import { Modal, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native';
import { View, FormCallbackPropsType, useMount, useUnmount } from 'shared';
import Emitter from 'shared/utils/emitter';
import IconBox from 'components/IconBox/IconBox';
import Login, { LoginResult } from './Login';
import Register from './Register';
import { styles } from './styles';
import { TabItem } from 'components/WilTabs/WilTabs';
import ForgottenAccount from './ForgottenAccount';

export interface RegisterResult {
  user_email: string;
  user_register: string;
  password_register: string;
}

export interface ModalLoginProps {
  onLogin: FormCallbackPropsType<LoginResult>;
  onRegister: FormCallbackPropsType<RegisterResult>;
  isLoading?: boolean;
  message?: string;
}

const Event = new Emitter();

export function onOpenModalLogin<TPayload>(payload?: TPayload) {
  Event.emit('login_open', payload);
}

export function onCloseModalLogin<TPayload>(payload?: TPayload) {
  Event.emit('login_close', payload);
}

const tabs: TabItem[] = [
  {
    key: 'login',
    title: 'Login',
  },
  {
    key: 'register',
    title: 'Register',
  },
];

export function ModalLogin({ onLogin, onRegister, isLoading }: ModalLoginProps) {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const formRef = useRef<FlatList<TabItem>>(null);
  let open = 0;
  let close = 0;

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const _handleChangeForm = (index: number) => () => {
    if (!!formRef.current) {
      formRef.current.scrollToIndex({
        animated: true,
        index: index >= tabs.length - 1 ? index - 1 : index + 1,
        viewPosition: 0.5,
      });
    }
  };

  useMount(() => {
    open = Event.once('login_open', handleOpen);
    close = Event.once('login_close', handleClose);
  });

  useUnmount(() => {
    Event.off(open);
    Event.off(close);
  });

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <StatusBar barStyle="light-content" />
      <View style={styles.wrapper}>
        <Image source={require('assets/login-cover.png')} resizeMode="cover" style={styles.imageBg} />
        <View safeAreaView safeAreaViewBottom flex style={styles.wrapper}>
          <View flex justifyContent="space-between">
            <View alignItems="flex-end" tachyons={['ph2', 'pv1']}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleClose}>
                <IconBox name="x" backgroundColor="light" />
              </TouchableOpacity>
            </View>
            <View flex alignItems="center" justifyContent="center">
              <Image source={require('assets/logo.png')} resizeMode="contain" style={styles.logo} />
            </View>
            <View tachyons="w100">
              <FlatList
                data={tabs}
                ref={formRef}
                keyboardShouldPersistTaps="handled"
                horizontal
                pagingEnabled
                scrollEnabled={false}
                keyExtractor={item => item.key}
                renderItem={({ item, index }) => {
                  return item.key === 'login' ? (
                    <Login onLogin={onLogin} isLoading={isLoading} onChangeForm={_handleChangeForm(index)} onForget={() => setVisible2(true)} />
                  ) : (
                    <Register onRegister={onRegister} onChangeForm={_handleChangeForm(index)} isLoading={isLoading} />
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <ForgottenAccount
        visible={visible2}
        onClose={visible => {
          setVisible2(visible);
        }}
      />
    </Modal>
  );
}
