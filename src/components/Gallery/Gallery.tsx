import React, { FC, useState, memo } from 'react';
import { Image, FlatList, ImageProps, View, withViewStyles, HeaderBase, Text, Icons } from 'shared';
import { Modal, ModalProps, TouchableOpacity as RNTouchableOpacity, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import StatusBar from 'components/StatusBar/StatusBar';
import { tachyonsStyles } from 'shared/themes/tachyons';
import { styles } from './styles';

const TouchableOpacity = withViewStyles(RNTouchableOpacity);

interface GalleryItem {
  id: number;
  uri: ImageProps['uri'];
}

export interface GalleryProps extends ModalProps {
  data: GalleryItem[];
  visible: boolean;
  onClose?: () => void;
}

const Gallery: FC<GalleryProps> = ({ data, onClose, ...rest }) => {
  const [indexImagesLoaded, setIndexImagesLoaded] = useState<number[]>([]);
  const [indexActive, setIndexActive] = useState(0);

  const handleImageLoad = (index: number) => () => {
    setIndexImagesLoaded(indexImagesLoaded => [...indexImagesLoaded, index]);
  };

  const handleDragEnd = (
    event: NativeSyntheticEvent<
      NativeScrollEvent & {
        targetContentOffset?: { x: number; y: number };
      }
    >,
  ) => {
    if (!!event.nativeEvent?.targetContentOffset) {
      const indexActive = event.nativeEvent.targetContentOffset.x / event.nativeEvent.layoutMeasurement.width;
      setIndexActive(indexActive);
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  const renderGalleryItem = ({ item, index }: { item: GalleryItem; index: number }) => {
    return (
      <View style={styles.item} tachyons={['justifyCenter', 'itemsCenter']}>
        {!indexImagesLoaded.includes(index) && <ActivityIndicator size="small" />}
        <Image
          uri={item.uri}
          width="100%"
          height="100%"
          resizeMode="contain"
          containerStyle={{
            ...tachyonsStyles.bgTransparent,
            opacity: indexImagesLoaded.includes(index) ? 1 : 0,
          }}
          onLoad={handleImageLoad(index)}
        />
      </View>
    );
  };

  return (
    <Modal
      {...rest}
      animationType="slide"
      onDismiss={() => {
        setIndexActive(0);
      }}
      onRequestClose={handleClose}
    >
      <View flex safeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View flex tachyons={['relative']}>
          <View tachyons={['absolute', 'top0', 'left0', 'right0', 'z1']}>
            <HeaderBase
              Left={
                <Text colorNative="#eee">
                  {indexActive + 1} / {data.length}
                </Text>
              }
              Right={
                <TouchableOpacity activeOpacity={0.7} tachyons="pa1" onPress={handleClose}>
                  <Icons.Feather name="x" size={25} colorNative="#eee" />
                </TouchableOpacity>
              }
              backgroundColor="transparent"
            />
          </View>
          <FlatList
            data={data}
            keyExtractor={item => String(item.id)}
            horizontal
            pagingEnabled
            initialNumToRender={2}
            showsHorizontalScrollIndicator={false}
            renderItem={renderGalleryItem}
            onScrollEndDrag={handleDragEnd}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(Gallery);
