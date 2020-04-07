import React, { ReactNode, useEffect, useMemo, useState, useRef } from 'react';
import {
  ScrollViewProps,
  FlatListProps,
  StyleProp,
  ViewStyle,
  FlatList,
  ScrollView,
  Animated,
  SafeAreaView,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import { isIphoneX, statusBarHeight } from 'utils/constants/base';
import useHeaderAnimated from 'shared/hooks/useAnimation';
import { Container } from 'shared';

interface HeaderProps<ItemT> extends ScrollViewProps {
  headerHeight?: number;
  style?: StyleProp<ViewStyle>;
  useFlatList?: boolean;
  renderHeader: () => ReactNode;
  renderContent: () => ReactNode;
  flatListProps?: Partial<Pick<FlatListProps<ItemT>, 'data' | 'renderItem' | 'keyExtractor' | 'numColumns'>>;
  headerStyle?: StyleProp<ViewStyle>;
}

const IPX = isIphoneX();

const STATUS_BAR_HEIGHT = statusBarHeight;
function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

// interface AnimatedContentViewProps<ItemT> extends ScrollViewProps {
//   children: ReactNode;
//   flatListProps: FlatListProps<ItemT>;
// }
// type AnimatedContentViewType = <ItemT>(props: AnimatedContentViewProps<ItemT>) => ReactNode;

let _clampedScrollValue = 0;
let _offsetValue = 0;
let _scrollValue = 0;
let _scrollEndTimer: Timeout;

function HeaderAnimation<ItemT>({
  headerHeight = 64,
  useFlatList = false,
  flatListProps,
  renderHeader,
  renderContent,
  headerStyle,
}: HeaderProps<ItemT>) {
  const ContentView = useFlatList ? FlatList : ScrollView;
  const { scrollAnim, offsetAnim, headerY } = useHeaderAnimated(headerHeight);
  const [refreshing, setRefreshing] = useState(false);
  const [bounce, setBounce] = useState(true);
  const nativeEventRef = useRef<NativeScrollEvent>(null);
  const AnimatedContentView = useMemo(() => {
    return Animated.createAnimatedComponent(ContentView);
  }, [ContentView]);

  useEffect(() => {
    const scrollY = scrollAnim;
    const offsetY = offsetAnim;
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(Math.max(_clampedScrollValue + diff, 0), headerHeight - STATUS_BAR_HEIGHT);
    });
    offsetY.addListener(({ value }) => {
      _offsetValue = value;
    });
    return () => {
      scrollY.removeAllListeners();
      offsetY.removeAllListeners();
    };
  }, [headerHeight, offsetAnim, scrollAnim]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [setRefreshing]);

  const _onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > headerHeight && _clampedScrollValue > (headerHeight - STATUS_BAR_HEIGHT - 20) / 2
        ? _offsetValue + headerHeight
        : _offsetValue - headerHeight;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const _onScrollEndDrag = () => {
    _scrollEndTimer = setTimeout(_onMomentumScrollEnd, 0);
  };
  const _onMomentumScrollBegin = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    clearTimeout(_scrollEndTimer);
    const { nativeEvent } = event;
    let previousOffsetY = 0;
    if (nativeEventRef.current) {
      previousOffsetY = nativeEventRef.current.contentOffset.y;
    }
    const offsetY = nativeEvent.contentOffset.y;
    if (offsetY - previousOffsetY > 0 && offsetY >= (nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height) / 2) {
      setBounce(false);
    } else {
      setBounce(true);
    }

    // @ts-ignore
    nativeEventRef.current = nativeEvent;
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <AnimatedContentView
        {...flatListProps}
        scrollEventThrottle={16}
        bounces={bounce}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: IPX ? statusBarHeight : headerHeight,
        }}
        onMomentumScrollBegin={_onMomentumScrollBegin}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        onScrollEndDrag={_onScrollEndDrag}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollAnim },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {renderContent()}
      </AnimatedContentView>
      <Animated.View
        style={[
          styles.navBar,
          headerStyle,

          {
            paddingTop: Platform.OS === 'ios' ? statusBarHeight : 0,
            transform: [
              {
                translateY: headerY,
              },
            ],
          },
        ]}
      >
        <Container>{renderHeader()}</Container>
      </Animated.View>
    </SafeAreaView>
  );
}

export default HeaderAnimation;
