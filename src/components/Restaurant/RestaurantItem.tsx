import * as React from 'react';
import { TouchableOpacity as RNTouchable } from 'react-native';
import { View, Image, Text, withViewStyles } from 'shared';
import styles from './styles';
import * as WebBrowser from 'expo-web-browser';

const TouchableOpacity = withViewStyles(RNTouchable);

export interface RestaurantItemProps {
  content?: string;
  img?: string;
  newPrice?: string;
  oldPrice?: string;
  saleContent?: string;
  title: string;
  link?: string;
}

function RestaurantItem({ content, img, newPrice, oldPrice, saleContent, title, link = '' }: RestaurantItemProps) {
  const _handleLink = () => {
    !!link && WebBrowser.openBrowserAsync(link);
  };
  return (
    <TouchableOpacity tachyons={['pa1', 'flexRow', 'justifyBetween']} activeOpacity={1} onPress={_handleLink}>
      <View tachyons={['pa1', 'flexRow']}>
        <View style={styles.image}>
          <Image uri={img} tachyons={['br3', 'absolute', 'z1']} height="100%" />
        </View>
        <View tachyons={['justifyCenter', 'w60', 'ph2']}>
          <Text size={14} color="dark1" style={styles.uppercase} tachyons={['b']}>
            {title}
          </Text>
          <Text size={12} ellipsizeMode="tail" numberOfLines={1}>
            {content}
          </Text>
          {!!saleContent && (
            <View tachyons={['flexWrap']}>
              <View backgroundColor="danger" tachyons={['itemsCenter', 'justifyCenter', 'br2', 'ph2']}>
                <Text size={12} color="light">
                  {saleContent}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <View tachyons={['flexRow', 'itemsCenter', 'justifyStart', 'pr2']}>
        <Text size={14} color="dark1">
          {newPrice}
        </Text>
        {!!oldPrice && (
          <Text size={14} style={styles.lineThrough} tachyons={['ph1']}>
            {oldPrice}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(RestaurantItem);
