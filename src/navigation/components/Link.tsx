import React, { ReactNode, useCallback } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useNavigation, NavigationAction } from '@react-navigation/native';
import { RootStackParamList } from 'types/Navigation';
import { Tachyons } from 'shared';
import { getTachyonsStyle } from 'shared/utils/getTachyonsStyle';

type RouteName = keyof RootStackParamList;

export interface LinkProps<RouteNameT extends RouteName> {
  children?: ReactNode;
  to?: RouteNameT | '../';
  push?: RouteNameT;
  params?: RootStackParamList[RouteNameT];
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  tachyons?: Tachyons;
  onBeforeNavigate?: () => void;
  onAfterNavigate?: () => void;
}

function Link<RouteNameT extends RouteName>({
  children,
  activeOpacity = 1,
  style = {},
  tachyons = [],
  to,
  params,
  push,
  onBeforeNavigate,
  onAfterNavigate,
}: LinkProps<RouteNameT>) {
  const navigation = useNavigation();
  const _handlePress = useCallback(() => {
    onBeforeNavigate?.();
    if (!!push) {
      (navigation as {
        push?: (routeNameOrOptions: string, params?: any, action?: NavigationAction) => boolean;
      })?.push?.(push, params);
    } else {
      if (to === '../') {
        navigation.goBack();
      } else if (!!to) {
        navigation.navigate(to, params);
      }
    }
    onAfterNavigate?.();
  }, [navigation, onAfterNavigate, onBeforeNavigate, params, push, to]);

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={_handlePress} style={[getTachyonsStyle(tachyons), style]}>
      {children}
    </TouchableOpacity>
  );
}

export default Link;
