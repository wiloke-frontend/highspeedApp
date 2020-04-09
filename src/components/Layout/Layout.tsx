import React, { FC, ReactNode, useLayoutEffect, memo } from 'react';
import { View, Container } from 'shared';
import { StatusBar, StatusBarStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import setHeaderAnimation from 'navigation/setHeaderAnimation';
import HeaderDefault from 'components/HeaderDefault/HeaderDefault';

export interface LayoutProps {
  statusBarStyle?: StatusBarStyle;
  safeAreaView?: boolean;
  headerAnimationType?: 'slide' | 'fade';
  Header?: ReactNode;
  Content: ReactNode;
}

const Layout: FC<LayoutProps> = ({
  statusBarStyle = 'dark-content',
  safeAreaView = true,
  headerAnimationType = 'slide',
  Header = (
    <Container>
      <HeaderDefault />
    </Container>
  ),
  Content,
}) => {
  const navigation = useNavigation();
  const isSlide = headerAnimationType === 'slide';

  useLayoutEffect(() => {
    navigation.setOptions({
      header: isSlide ? () => null : setHeaderAnimation(Header),
    });
  }, [Header, isSlide, navigation]);

  return (
    <View flex safeAreaView={safeAreaView}>
      <StatusBar barStyle={statusBarStyle} />
      {isSlide && Header}
      {Content}
    </View>
  );
};

export default memo(Layout);
