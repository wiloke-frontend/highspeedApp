import React, { memo, FC, ReactNode } from 'react';
import { View, OfflineNotice, ViewProps } from 'shared';
import { StatusBar } from 'react-native';
import i18n from 'utils/functions/i18n';
import { useSelector } from 'react-redux';
import { nightModeSelector } from 'screens/ProfileScreen/selectors';

export interface ScreenContainerProps extends Pick<ViewProps, 'safeAreaView' | 'safeAreaViewBottom' | 'onMount'> {
  children: ReactNode;
  Header?: ReactNode;
}

const ScreenContainer: FC<ScreenContainerProps> = ({ safeAreaView = false, safeAreaViewBottom = false, children, Header, onMount }) => {
  const nightMode = useSelector(nightModeSelector);

  return (
    <View flex onMount={onMount} safeAreaView={safeAreaView} safeAreaViewBottom={safeAreaViewBottom} backgroundColor="light">
      <StatusBar barStyle={nightMode ? 'light-content' : 'dark-content'} />
      {Header}
      <OfflineNotice>{i18n.t('noInternet')}</OfflineNotice>
      {children}
    </View>
  );
};

export default memo(ScreenContainer);
