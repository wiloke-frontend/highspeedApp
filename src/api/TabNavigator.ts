import { FeatherNameType } from 'shared/types/FeatherNameType';

export interface TabNavigatorItem {
  name: 'home' | 'myposts' | 'notifications' | 'categories' | 'search' | 'menu';
  label: string;
  iconName: FeatherNameType | '';
  iconColor: string;
  enable: boolean;
  screen: 'HomeTabNavigator' | 'MyPostsNavigator' | 'NotifyNavigator' | 'CategoryNavigator' | 'SeachNavigator' | 'MenuNavigator';
}

export interface TabNavigator {
  status: string;
  data: TabNavigatorItem[];
}
