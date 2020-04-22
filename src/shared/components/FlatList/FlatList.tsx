import React, { ReactNode, useRef } from 'react';
import { FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native';
import { View } from 'shared/components/View/View';
import { Container } from 'shared/components/Container/Container';
import { tachyonsStyles as tachyons } from 'shared/themes/tachyons';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import isIOS from 'shared/utils/isIOS';
import { range } from 'ramda';
import { useMount } from 'shared/hooks/useMount';
import { NavigationStackProp } from 'react-navigation-stack';

export interface FlatListProps<ItemT> extends RNFlatListProps<ItemT> {
  useContainer?: boolean;
  numGap?: number;
  navigation?: NavigationStackProp;
}

export function FlatList<ItemT>({
  useContainer = false,
  renderItem,
  numColumns = 1,
  numGap = 16,
  data,
  navigation,
  contentContainerStyle,
  columnWrapperStyle,
  horizontal,
  ListHeaderComponent,
  ListEmptyComponent,
  ...rest
}: FlatListProps<ItemT>) {
  const { sizes } = useTheme();
  const flatListRef = useRef<RNFlatList<ItemT> | null>(null);
  const ItemWrap = useContainer && numColumns === 1 ? Container : View;
  const ListComponentWrap = useContainer && isIOS ? Container : numColumns > 1 ? View : Container;
  const itemWrapStyle = numColumns > 1 ? { width: `${100 / numColumns}%` } : {};
  const listComponentWrapStyle = isIOS ? {} : numColumns > 1 ? { maxWidth: sizes.container } : {};
  const gapItemStyle = numColumns > 1 ? { paddingHorizontal: numGap / 2 } : {};
  const columnWrapperMaxWidth = sizes.container + (numColumns > 1 ? numGap : 0);

  useMount(() => {
    !!navigation &&
      navigation.setParams({
        onScrollToTop: () => {
          flatListRef.current && flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        },
      });
  });

  const renderListComponent = (Component: ReactNode) => {
    return (
      <ListComponentWrap {...(horizontal ? { flex: 1 } : {})} style={listComponentWrapStyle} innerTachyons={isIOS ? 'w100' : 'w100'}>
        {Component}
      </ListComponentWrap>
    );
  };

  /**
   * renderItemFixed
   * @param index - item index
   * @example
   * [item1] [item2] [item3]
   * [item4] [item5] [item6]
   * [item7] [fixed1] [fixed2]
   */
  const renderItemFixed = (index: number) => {
    return (
      !!data &&
      data.length % numColumns !== 0 &&
      index === data.length - 1 &&
      range(0, numColumns - (data.length % numColumns)).map(item => <View key={String(item)} style={[itemWrapStyle, gapItemStyle]} />)
    );
  };

  return (
    <RNFlatList
      {...rest}
      data={data}
      ref={c => {
        flatListRef.current = c;
      }}
      numColumns={numColumns}
      horizontal={horizontal}
      ListHeaderComponent={renderListComponent(ListHeaderComponent)}
      // ListFooterComponent={renderListComponent(ListFooterComponent)}
      ListEmptyComponent={renderListComponent(ListEmptyComponent)}
      renderItem={info => {
        return (
          <>
            <ItemWrap style={[itemWrapStyle, gapItemStyle]}>{renderItem(info)}</ItemWrap>
            {renderItemFixed(info.index)}
          </>
        );
      }}
      {...(useContainer && numColumns > 1
        ? {
            contentContainerStyle: [tachyons.itemsCenter, contentContainerStyle],
            columnWrapperStyle: [{ maxWidth: columnWrapperMaxWidth }, columnWrapperStyle],
          }
        : {
            contentContainerStyle,
            columnWrapperStyle,
          })}
    />
  );
}
