import React from 'react';
import { RootNavigator } from 'navigation';
import { View, useMount } from 'shared';
import { useSelector } from 'react-redux';
import { isLoggedInSelector } from 'screens/AuthContainer/selectors';
import { tabNavigatorSelector } from 'screens/AppContainer/selectors';
import { useGetTabNavigatorRequest } from './actions/actionTabNavigator';
import i18n from 'utils/functions/i18n';
import ModalAppUpdate from 'components/ModalAppUpdate/ModalAppUpdate';
import configureApp from 'utils/constants/configureApp';
import { useGetNotificationTotal } from './actions/actionNotificationTotal';
import AuthContainer from 'screens/AuthContainer/AuthContainer';

export default function AppContainer() {
  const getTabNavigator = useGetTabNavigatorRequest();
  const getNotificationTotal = useGetNotificationTotal();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const tabNavigator = useSelector(tabNavigatorSelector);

  useMount(() => {
    getTabNavigator({ endpoint: 'tab-navigators' });
    if (isLoggedIn) {
      getNotificationTotal.request({ endpoint: 'notification-total?seen=no' });
    }
  });

  return (
    <View flex>
      <AuthContainer />
      <ModalAppUpdate
        text={configureApp.settings.applicationUpdateMessage}
        buttonUpdateText={i18n.t('updateNow')}
        moreText={i18n.t('seeMoreUpdateDetails')}
      />
      <RootNavigator tabNavigatorData={tabNavigator.data} />
    </View>
  );
}
