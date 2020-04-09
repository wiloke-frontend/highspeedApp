import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import configureApp from 'utils/constants/configureApp';

const tabBarOptions: BottomTabBarOptions = {
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
};

export default tabBarOptions;
