import React from 'react';
import { CreateNavigatorConfig, NavigationTabRouterConfig, NavigationRoute } from 'react-navigation';
import { NavigationTabProp, NavigationBottomTabOptions, BottomTabBarOptions } from 'react-navigation-tabs/lib/typescript/src/types';
import configureApp from 'utils/constants/configureApp';
import { Colors } from 'shared';

interface Config {
  lazy?: boolean;
  tabBarComponent?: React.ComponentType<any>;
  tabBarOptions?: BottomTabBarOptions;
}

type TabNavigatorOptions = CreateNavigatorConfig<
  Partial<Config>,
  NavigationTabRouterConfig,
  Partial<NavigationBottomTabOptions>,
  NavigationTabProp<NavigationRoute, any>
>;

const tabNavigatorOptions = (colors: Colors): TabNavigatorOptions => ({
  backBehavior: 'history',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: configureApp.settings.colorPrimary,
    inactiveTintColor: 'transparent',
    style: {
      backgroundColor: colors.light,
      borderTopColor: colors.gray3,
    },
    labelStyle: {
      borderRadius: 100,
      fontSize: 10,
      fontWeight: '500',
      padding: 0,
      paddingLeft: 3,
      paddingRight: 3,
      paddingBottom: 2,
      margin: 0,
    },
  },
});

export default tabNavigatorOptions;
