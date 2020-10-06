import React, { memo } from 'react';
import { FlatList } from 'react-native';
import { View, useTheme } from 'shared';
import RestaurantItem, { RestaurantItemProps } from './RestaurantItem';
import styles from './styles';

export interface MenuRestaurantProps {
  menus?: RestaurantItemProps[];
}

function MenuRestaurant({ menus }: MenuRestaurantProps) {
  const { colors } = useTheme();
  const _renderRestaurantItem = ({ item, index }: { item: RestaurantItemProps; index: number }) => {
    const style = menus && index === menus.length - 1 ? [] : [styles.item, { borderBottomColor: colors.gray2 }];
    return (
      <View tachyons={['pb2', 'mb2']} style={style}>
        <RestaurantItem {...item} />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={menus}
        renderItem={_renderRestaurantItem}
        keyExtractor={(_item, index) => index.toString() + '___restaurantMenu'}
        scrollEnabled={false}
      />
    </View>
  );
}

export default memo(MenuRestaurant);
