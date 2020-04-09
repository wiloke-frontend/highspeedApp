import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'shared';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import PostDetailScreen from 'screens/PostDetailScreen/PostDetailScreen';
import SearchScreen from 'screens/SearchScreen/SearchScreen';
import SelectCatScreen from 'screens/SelectCatScreen/SelectCatScreen';
import PostsScreen from 'screens/PostsScreen/PostsScreen';
import NotifyScreen from 'screens/NotifyScreen/NotifyScreen';
import CategoryScreen from 'screens/CategoryScreen/CategoryScreen';
import ProfileScreen from 'screens/ProfileScreen/ProfileScreen';
import MenuScreen from 'screens/MenuScreen/MenuScreen';
import HistoryPostsScreen from 'screens/HistoryPostsScreen/HistoryPostsScreen';
import CommentScreen from 'screens/CommentScreen/CommentsScreen';
import ReplyScreen from 'screens/CommentScreen/ReplyScreen';
import ChangePasswordScreen from 'screens/ChangePasswordScreen/ChangePasswordScreen';
import { useSelector } from 'react-redux';
import { tabNavigatorSelector } from 'store/selectors';
import TabBarItem from 'components/TabBarItem/TabBarItem';
import tabBarOptions from 'navigation/functions/tabBarOptions';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  const { styled } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyle: styled.bgLight,
      }}
      headerMode="none"
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="HomePostsScreen" component={PostsScreen} />
    </HomeStack.Navigator>
  );
};

const MenuStack = createStackNavigator();

const MenuStackNavigator = () => {
  const { styled } = useTheme();
  return (
    <MenuStack.Navigator
      screenOptions={{
        cardStyle: styled.bgLight,
      }}
      headerMode="none"
    >
      <MenuStack.Screen name="HomeScreen" component={MenuScreen} />
    </MenuStack.Navigator>
  );
};

const MyPostsStack = createStackNavigator();

const MyPostsNavigator = () => {
  const { styled } = useTheme();
  return (
    <MyPostsStack.Navigator
      screenOptions={{
        cardStyle: styled.bgLight,
      }}
      headerMode="none"
    >
      <MyPostsStack.Screen name="SelectCatScreen" component={SelectCatScreen} />
    </MyPostsStack.Navigator>
  );
};

const tabScreens = {
  HomeTabNavigator: HomeStackNavigator,
  MenuNavigator: MenuStackNavigator,
  MyPostsNavigator: MyPostsNavigator,
  NotifyNavigator: MenuStackNavigator,
  CategoryNavigator: MenuStackNavigator,
  SeachNavigator: MenuStackNavigator,
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabNavigator = useSelector(tabNavigatorSelector);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const item = tabNavigator.data.filter(item => item.name === route.name)[0];
        return {
          tabBarIcon: ({ focused }) => {
            return <TabBarItem focused={focused} iconName={item.iconName} iconColor={item.iconColor} />;
          },
          tabBarLabel: item.label,
        };
      }}
      backBehavior="history"
      tabBarOptions={tabBarOptions}
    >
      {tabNavigator.data.map(item => {
        return <Tab.Screen key={item.name} name={item.name} component={tabScreens[item.screen]} />;
      })}
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();

function ConfigNavigator() {
  const { styled } = useTheme();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          cardStyle: styled.bgLight,
        }}
        headerMode="none"
      >
        <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        <RootStack.Screen name="SearchScreen" component={SearchScreen} />
        <RootStack.Screen name="Comments" component={CommentScreen} />
        <RootStack.Screen name="PostsScreen" component={PostsScreen} />
        <RootStack.Screen name="PostDetailScreen" component={PostDetailScreen} />
        <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <RootStack.Screen name="HistoryPostsScreen" component={HistoryPostsScreen} />
        <RootStack.Screen name="MenuProfileScreen" component={ProfileScreen} />
        <RootStack.Screen name="MenuNotifyScreen" component={NotifyScreen} />
        <RootStack.Screen name="MenuCategoryScreen" component={CategoryScreen} />
        <RootStack.Screen name="MenuMyPostsScreen" component={SelectCatScreen} />
        <RootStack.Screen name="MenuSearchScreen" component={SearchScreen} />
        <RootStack.Screen name="ReplyScreen" component={ReplyScreen} />
        <RootStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default ConfigNavigator;

// import React, { memo } from 'react';
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
// import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
// import handleTabNavigator from 'navigation/functions/handleTabNavigator';
// import { rootTabNavigators, rootStackNavigators } from 'navigation/configure';
// import TabBarItem from 'components/TabBarItem/TabBarItem';
// import tabNavigatorOptions from 'navigation/functions/tabNavigatorOptions';
// import configureApp from 'utils/constants/configureApp';
// import { useSelector } from 'react-redux';
// import { tabNavigatorSelector } from 'store/selectors';
// import isAndroid from 'shared/utils/isAndroid';
// import { useTheme } from 'shared';

// type RootStackNavigatorsKey = keyof typeof rootStackNavigators;

// type HandleStackNavigatorsReturnType = {
//   [K in RootStackNavigatorsKey]: {
//     screen: ValueOf<typeof rootStackNavigators>;
//     navigationOptions: NavigationStackOptions;
//   };
// };

// const { settings } = configureApp;

// const ConfigNavigator = () => {
//   const tabNavigator = useSelector(tabNavigatorSelector);
//   const { colors } = useTheme();

//   // biến đổi rootStackNavigators và gán thêm gestureResponseDistance 500
//   const handleStackNavigators = () => {
//     return Object.entries(rootStackNavigators).reduce<HandleStackNavigatorsReturnType>((acc, [key, value]) => {
//       return {
//         ...acc,
//         [key]: {
//           screen: value,
//           navigationOptions: () => ({
//             gesturesEnabled: true,
//             gestureResponseDistance: {
//               horizontal: key.includes('NotGetureDistance') ? 0 : 500,
//             },
//           }),
//         },
//       };
//       // @ts-ignore
//     }, {});
//   };

//   const createRootTabNavigatorRoutes = () => {
//     return handleTabNavigator(tabNavigator.data, rootTabNavigators, ({ tabBarLabel, iconName, iconColor }) => ({
//       tabBarLabel,
//       tabBarIcon: ({ focused }) => {
//         return (
//           <TabBarItem
//             focused={focused}
//             iconName={iconName}
//             iconColor={iconColor}
//             labelName={settings.tabNavigator === 'default' ? tabBarLabel : ''}
//           />
//         );
//       },
//     }));
//   };

//   const rootTabNavigatorValue = () => {
//     if (settings.tabNavigator === 'default') {
//       return createBottomTabNavigator(createRootTabNavigatorRoutes(), tabNavigatorOptions);
//     }
//     return createMaterialBottomTabNavigator(createRootTabNavigatorRoutes(), {
//       activeColor: settings.colorPrimary,
//       barStyle: { backgroundColor: colors.light },
//       labeled: false,
//     });
//   };

//   const RootStack = createStackNavigator(
//     {
//       RootTabNavigator: rootTabNavigatorValue(),
//       ...handleStackNavigators(),
//     },
//     {
//       headerMode: 'none',
//       ...(isAndroid ? { transitionConfig: getSlideFromRightTransition } : {}),
//     },
//   );
//   const CreateRootStack = createAppContainer(RootStack);
//   return <CreateRootStack />;
// };

// export default memo(ConfigNavigator);
