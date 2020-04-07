import React, { ReactNode, useState } from 'react';
import { Text, ViewStyle, StyleProp } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Event, Scene, SceneRendererProps, NavigationState } from 'react-native-tab-view/lib/typescript/src/types';
import styles from './styles';
import { View, useMount, useTheme } from 'shared';
import { isEmpty } from 'ramda';

export interface TabItem {
  key: string;
  title: string;
}

export interface WilTabsProps<TTabItem> {
  data: TTabItem[];
  indexActive?: number;
  tabBarStyles?: ViewStyle;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  tabBarWrapStyle?: StyleProp<ViewStyle>;
  lazy?: boolean;
  tabDisabled?: boolean;
  renderLazyPlaceholder?: (props: { route: TTabItem }) => ReactNode;
  renderItem: (item: TTabItem, nextItem: TTabItem, index: number, indexFocused: number) => ReactNode;
  onSwipeStart?: (item: TTabItem, index: number) => void;
  onSwipeEnd?: (item: TTabItem, nextItem: TTabItem, index: number) => void;
  onTabPress?: (item: TTabItem, nextItem: TTabItem, index: number) => void;
  onMount?: (item: TTabItem, nextItem: TTabItem, index: number) => void;
  swipeEnabled?: boolean;
}

export default function WilTabs<TTabItem extends TabItem>({
  onSwipeStart = () => {},
  onSwipeEnd = () => {},
  onTabPress = () => {},
  onMount = () => {},
  renderLazyPlaceholder = () => null,
  indexActive = 0,
  tabBarStyles = {},
  sceneContainerStyle = {},
  tabBarWrapStyle = {},
  tabDisabled = false,
  swipeEnabled = true,
  data,
  lazy,
  renderItem,
}: WilTabsProps<TTabItem>) {
  const [indexState, setIndexState] = useState(indexActive);
  const { styled } = useTheme();

  const getNextItemWithIndex = (index: number): TTabItem => {
    return index + 1 < data.length ? data[index + 1] : ({ key: '', title: '' } as TTabItem);
  };

  const handleSwipe = (type: 'start' | 'end') => {
    const item: TTabItem = data[indexState];
    const nextItem = getNextItemWithIndex(indexState);
    return () => {
      if (type === 'start') {
        onSwipeStart(item, indexState);
      } else {
        onSwipeEnd(item, nextItem, indexState);
      }
    };
  };

  const handleTabPress = (scene: Scene<TTabItem> & Event) => {
    const index = data.findIndex(item => item.key === scene.route.key);
    const nextItem = getNextItemWithIndex(index);
    onTabPress(scene.route, nextItem, index);
  };

  useMount(() => {
    const item: TTabItem = data[indexState];
    const nextItem = getNextItemWithIndex(indexState);
    onMount(item, nextItem, indexState);
  });

  const renderLabel = ({
    route,
    focused,
  }: Scene<TTabItem> & {
    focused: boolean;
    color: string;
  }) => <Text style={focused ? styled.colorPrimary : styled.colorDark2}>{route.title}</Text>;

  const renderScene = ({
    route,
  }: SceneRendererProps & {
    route: TTabItem;
  }) => {
    const indexFocused = indexState;
    const index = data.findIndex(item => item.key === route.key);
    const nextItem = getNextItemWithIndex(index);
    return renderItem(route, nextItem, index, indexFocused);
  };

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<TTabItem>;
    },
  ) => {
    return (
      <View style={tabBarWrapStyle}>
        <TabBar
          {...props}
          scrollEnabled
          indicatorStyle={styled.bgPrimary}
          style={styled.bgLight}
          renderLabel={renderLabel}
          tabStyle={[styles.tabBar, tabBarStyles]}
          onTabPress={handleTabPress}
        />
      </View>
    );
  };

  if (isEmpty(data)) {
    return null;
  }

  return (
    <TabView
      navigationState={{
        index: indexState,
        routes: data,
      }}
      renderTabBar={!tabDisabled ? renderTabBar : () => null}
      renderScene={renderScene}
      renderLazyPlaceholder={renderLazyPlaceholder}
      onIndexChange={setIndexState}
      onSwipeStart={handleSwipe('start')}
      onSwipeEnd={handleSwipe('end')}
      sceneContainerStyle={sceneContainerStyle}
      lazy={lazy}
      swipeEnabled={swipeEnabled}
    />
  );
}
