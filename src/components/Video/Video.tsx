import React, { FC, useState, memo } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Icons, Tachyons, View, Image } from 'shared';
import styles from './styles';

export interface VideoProps {
  uri: string;
  thumbnailUri: string;
  thumbnailPreview?: string;
  style?: StyleProp<ViewStyle>;
  percentRatio?: string;
  tachyons?: Tachyons;
}

const Video: FC<VideoProps> = ({ percentRatio = `${(9 / 16) * 100}%`, uri, style, thumbnailUri, thumbnailPreview, tachyons }) => {
  const [width, setWidth] = useState(0);
  const sizePlayButton = width / 4 < 60 ? width / 4 : 60;

  const handlePress = () => {
    WebBrowser.openBrowserAsync(uri);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  return (
    <View onLayout={handleLayout} style={[styles.container, style]} tachyons={tachyons}>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress}>
        <Image uri={thumbnailUri} preview={thumbnailPreview} percentRatio={percentRatio} />
        <View tachyons={['absolute', 'absoluteFill', 'z1', 'itemsCenter', 'justifyCenter']} style={styles.overlay}>
          <View
            style={[
              styles.iconWrap,
              {
                width: sizePlayButton,
                height: sizePlayButton,
                borderRadius: sizePlayButton / 2,
              },
            ]}
          >
            <Icons.Feather name="play" size={sizePlayButton / 2.2} colorNative="#fff" style={styles.icon} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Video);
