import React, { useState, useEffect, FC } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, ViewProps } from 'shared/components/View/View';
import { Text } from 'shared/components/Text/Text';
import { Icons } from '../Icons/Icons';

export interface OfflineNoticeProps extends ViewProps {}

export const OfflineNotice: FC<OfflineNoticeProps> = ({ backgroundColor = 'dark1', children = 'No Internet Connection', ...rest }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected) {
    return null;
  }

  return (
    <View {...rest} backgroundColor={backgroundColor}>
      {typeof children === 'string' ? (
        <View tachyons={['itemsCenter', 'justifyCenter', 'flexRow', 'pa2']}>
          <Icons.Feather name="alert-triangle" color="gray1" size={18} />
          <Text color="gray1" tachyons={['tc', 'pl2']}>
            {children}
          </Text>
        </View>
      ) : (
        children
      )}
    </View>
  );
};
