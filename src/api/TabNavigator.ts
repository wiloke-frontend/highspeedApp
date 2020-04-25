import { FeatherNameType } from 'shared/types/FeatherNameType';

export interface TabNavigatorItem {
  name: string;
  label: string;
  iconName: FeatherNameType | '';
  enable: boolean;
  screen: 'HomeTabNavigator' | 'MyPostsNavigator' | 'NotifyNavigator' | 'CategoryNavigator' | 'SearchNavigator' | 'MenuNavigator';
}

export interface TabNavigator {
  status: string;
  data: TabNavigatorItem[];
}
