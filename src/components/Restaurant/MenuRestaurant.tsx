import React, { memo } from 'react';
import { FlatList } from 'react-native';
import { View, Divider, Text, useTheme } from 'shared';
import RestaurantItem, { RestaurantItemProps } from './RestaurantItem';
import styles from './styles';

export interface MenuRestaurantProps {
  heading?: string;
  subHeading?: string;
  menus?: RestaurantItemProps[];
}

function MenuRestaurant({ heading, subHeading, menus }: MenuRestaurantProps) {
  const { colors } = useTheme();

  const _renderRestaurantItem = ({ item }: { item: RestaurantItemProps }) => {
    return <RestaurantItem {...item} />;
  };
  return (
    <View backgroundColor="gray3">
      <View tachyons={['justifyCenter', 'itemsCenter', 'pa4']}>
        <Text size={30} tachyons={['fw5', 'pv2']} style={{ color: colors?.primary }}>
          {heading}
        </Text>
        <View tachyons={['justifyBetween', 'itemsCenter', 'flexRow']}>
          <Divider tailwind={['w-12']} />
          <Text size={13} tachyons={['b', 'ph3', 'black']} style={styles.uppercase}>
            {subHeading}
          </Text>
          <Divider tailwind={['w-12']} />
        </View>
      </View>
      <View>
        <FlatList
          data={menus}
          renderItem={_renderRestaurantItem}
          keyExtractor={(_item, index) => index.toString() + '___restaurantMenu'}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

export default memo(MenuRestaurant);
