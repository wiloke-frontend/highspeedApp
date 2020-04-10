import React from 'react';
import { CreateNavigatorConfig, NavigationTabRouterConfig, NavigationRoute } from 'react-navigation';
import { NavigationTabProp, NavigationBottomTabOptions, BottomTabBarOptions } from 'react-navigation-tabs/lib/typescript/src/types';
import configureApp from 'utils/constants/configureApp';

interface Config {
  lazy?: boolean;
  tabBarComponent?: React.ComponentType<any>;
  tabBarOptions?: BottomTabBarOptions;
}

type TabNavigatorOptionType = CreateNavigatorConfig<
  Partial<Config>,
  NavigationTabRouterConfig,
  Partial<NavigationBottomTabOptions>,
  NavigationTabProp<NavigationRoute, any>
>;

const tabNavigatorOptions: TabNavigatorOptionType = {
  backBehavior: 'history',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: configureApp.settings.colorPrimary,
    inactiveTintColor: '#666',
    style: {
      backgroundColor: '#fff',
      // borderTopColor: configureApp.settings.colorPrimary,
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
};

export default tabNavigatorOptions;