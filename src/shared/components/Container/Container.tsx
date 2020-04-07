import React, { FC, memo, ReactNode } from 'react';
import { View, ViewProps } from 'shared';
import { Tachyons, Column, Flex, Tailwind } from 'shared/types/types';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../ThemeContext/ThemeContext';

export interface ContainerProps {
  children: ReactNode;
  safeAreaView?: ViewProps['safeAreaView'];
  tailwind?: Tailwind;
  tachyons?: Tachyons;
  flex?: Flex | boolean;
  column?: Column;
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
  innerTachyons?: Tachyons;
}

const ContainerComponent: FC<ContainerProps> = ({ children, safeAreaView, tachyons = [], flex, style, maxWidth, innerTachyons = [] }) => {
  const { sizes } = useTheme();

  return (
    <View flex={flex} safeAreaView={safeAreaView} tachyons={['itemsCenter', ...(typeof tachyons === 'string' ? [tachyons] : tachyons)]} style={style}>
      <View
        flex={flex}
        style={{ maxWidth: maxWidth ?? sizes.container }}
        tachyons={['w100', ...(typeof innerTachyons === 'string' ? [innerTachyons] : innerTachyons)]}
      >
        {children}
      </View>
    </View>
  );
};

export const Container = memo(ContainerComponent);
