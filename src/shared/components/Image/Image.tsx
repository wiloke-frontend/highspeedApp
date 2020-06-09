import React, { FC, useState, useRef, memo } from 'react';
import { Image as RNImage, ViewStyle, ImageProps as ImageRNProps } from 'react-native';
import * as R from 'ramda';
import styles from './styles';
import { View } from 'shared/components/View/View';
import { BorderRadius, Tachyons } from 'shared/types/types';
import getBorderRadiusStyle from 'shared/utils/getBorderRadiusStyle';
import { tachyonsStyles } from 'shared/themes/tachyons';
import { useMount } from 'shared/hooks/useMount';
import { useUnmount } from 'shared/hooks/useUnmount';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import { Icons } from '../Icons/Icons';

export interface ImageProps extends Omit<ImageRNProps, 'source' | 'defaultSource' | 'borderRadius' | 'style' | 'width' | 'height'> {
  uri?: string;
  preview?: string;
  percentRatio?: string;
  containerStyle?: ViewStyle;
  borderRadius?: BorderRadius;
  tachyons?: Tachyons;
  height?: number | string;
  width?: number | string;
  loading?: boolean;
}

const DEFAULT_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpifvfuHUCAAQAFpALOO255kgAAAABJRU5ErkJggg==';

const ImageComponent: FC<ImageProps> = ({
  uri = DEFAULT_IMAGE,
  preview = DEFAULT_IMAGE,
  containerStyle = {},
  percentRatio = '',
  borderRadius = 'default',
  tachyons = [],
  onLoadEnd,
  resizeMode = 'cover',
  width,
  height,
  loading = false,
  ...rest
}) => {
  const [percentRatioState, setPercentRatioState] = useState(percentRatio || '75%');
  const [isPreviewLoaded, setPreviewLoaded] = useState(false);
  const [isUriLoaded, setUriLoaded] = useState(false);
  const req = useRef(-1);
  const checkHeight = R.path(['height'], containerStyle);
  const { styled } = useTheme();

  useMount(() => {
    if (!!percentRatio) {
      setPercentRatioState(percentRatio);
    }
  });

  useUnmount(() => {
    req.current && cancelAnimationFrame(req.current);
  });

  const handleGetImageSizeSuccess = (width: number, height: number) => {
    setPercentRatioState(`${(height / width) * 100}%`);
  };

  const handleGetImageSizeFailed = () => {
    console.log('Image getSize failed');
    req.current && cancelAnimationFrame(req.current);
  };

  const handleLoadEnd = () => {
    if (!percentRatio) {
      req.current = requestAnimationFrame(() => {
        RNImage.getSize(uri, handleGetImageSizeSuccess, handleGetImageSizeFailed);
      });
    }
    setUriLoaded(true);
    onLoadEnd?.();
  };

  const handlePreviewLoadEnd = () => {
    setPreviewLoaded(true);
  };

  return (
    <View
      tachyons={tachyons}
      style={[
        styles.container,
        getBorderRadiusStyle(borderRadius),
        styled.bgGray2,
        containerStyle,
        !!width ? { width } : {},
        !!height ? { height } : {},
      ]}
    >
      {!checkHeight && <View style={{ paddingTop: percentRatioState }} tachyons={['flex', 'itemsCenter', 'justifyCenter']} />}
      {!loading && !!preview && !isUriLoaded && (
        <RNImage
          source={{ uri: preview }}
          resizeMode={resizeMode}
          style={[tachyonsStyles.absolute, tachyonsStyles.absoluteFill, tachyonsStyles.z1]}
          onLoadEnd={handlePreviewLoadEnd}
          blurRadius={1}
        />
      )}
      {!loading && isPreviewLoaded && !!uri && (
        <RNImage
          {...rest}
          resizeMode={resizeMode}
          source={{ uri }}
          style={[tachyonsStyles.absolute, tachyonsStyles.absoluteFill, tachyonsStyles.z2]}
          onLoadEnd={handleLoadEnd}
        />
      )}
      {loading && (
        <View tachyons={['absolute', 'absoluteFill', 'itemsCenter', 'justifyCenter']}>
          <Icons.Feather name="image" size={50} color="gray1" />
        </View>
      )}
    </View>
  );
};

export const Image = memo(ImageComponent);
