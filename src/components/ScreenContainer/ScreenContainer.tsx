import React, { memo, FC, ReactNode } from 'react';
import { View, OfflineNotice, ViewProps } from 'shared';
import StatusBar from 'components/StatusBar/StatusBar';
import i18n from 'utils/functions/i18n';

export interface ScreenContainerProps extends Pick<ViewProps, 'safeAreaView' | 'safeAreaViewBottom' | 'onMount'> {
  children: ReactNode;
  Header?: ReactNode;
}

const ScreenContainer: FC<ScreenContainerProps> = ({ safeAreaView = false, safeAreaViewBottom = false, children, Header, onMount }) => {
  return (
    <View flex onMount={onMount} safeAreaView={safeAreaView} safeAreaViewBottom={safeAreaViewBottom} backgroundColor="light">
      <StatusBar />
      {Header}
      <OfflineNotice>{i18n.t('noInternet')}</OfflineNotice>
      {children}
    </View>
  );
};

export default memo(ScreenContainer);
