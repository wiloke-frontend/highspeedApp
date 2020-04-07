import { ReactNode } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { FeatherNameType } from 'types/FeatherNameType';
import { TabNavigatorItem } from 'api/TabNavigator';

export interface RenderTabReturnType {
  tabBarLabel: string;
  tabBarIcon: ({ tintColor, focused }: { tintColor: string; focused: boolean }) => ReactNode;
}

export interface AccType {
  [key: string]: {
    screen: any;
    navigationOptions: RenderTabReturnType;
  };
}

export interface CheckScreenType {
  [key: string]: any;
}

export type RenderTabItemType = ({
  tabBarLabel,
  iconName,
}: {
  tabBarLabel: string;
  iconName: FeatherNameType | '';
  iconColor: string;
}) => RenderTabReturnType;

export default function handleTabNavigator(source: TabNavigatorItem[], checkScreen: CheckScreenType, renderTabItem: RenderTabItemType) {
  return source.reduce((acc: AccType, item: TabNavigatorItem) => {
    if (!item.enable || !checkScreen[item.screen]) {
      return acc;
    }
    const newValue = {
      screen: createStackNavigator(checkScreen[item.screen], { headerMode: 'none' }),
      navigationOptions: renderTabItem({
        tabBarLabel: item.label,
        iconName: item.iconName,
        iconColor: item.iconColor,
      }),
    };
    return {
      ...acc,
      [item.name]: newValue,
    };
  }, {});
}
