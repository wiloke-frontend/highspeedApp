import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { RootNavigator } from 'navigation';
import { ThemeProvider, View, useMount } from 'shared';
import { useSelector } from 'react-redux';
import { isLoggedInSelector } from 'containers/Auth/selectors';
import { tabNavigatorSelector } from 'containers/AppContent/selectors';
import { useGetTabNavigatorRequest } from './actions/actionTabNavigator';
import i18n from 'utils/functions/i18n';
import ModalAppUpdate from 'components/ModalAppUpdate/ModalAppUpdate';
import configureApp from 'utils/constants/configureApp';
import { useGetNotificationTotal } from './actions/actionNotificationTotal';
import Auth from 'containers/Auth/Auth';
import { nightModeSelector } from 'containers/ProfileScreen/selectors';
import { lights, darks } from 'utils/constants/base';

export default function AppContent() {
  const getTabNavigator = useGetTabNavigatorRequest();
  const getNotificationTotal = useGetNotificationTotal();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const tabNavigator = useSelector(tabNavigatorSelector);
  const nightMode = useSelector(nightModeSelector);

  useMount(() => {
    getTabNavigator({ endpoint: 'tab-navigators' });
    if (isLoggedIn) {
      getNotificationTotal.request({ endpoint: 'notification-total?seen=no' });
    }
  });

  return (
    <ThemeProvider
      themeOverrides={{
        colors: {
          primary: configureApp.settings.colorPrimary,
          ...(nightMode ? darks : lights),
        },
      }}
    >
      <ActionSheetProvider>
        <View flex>
          <Auth />
          <ModalAppUpdate
            text={configureApp.settings.applicationUpdateMessage}
            buttonUpdateText={i18n.t('updateNow')}
            moreText={i18n.t('seeMoreUpdateDetails')}
          />
          <RootNavigator tabNavigatorData={tabNavigator.data} />
        </View>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
