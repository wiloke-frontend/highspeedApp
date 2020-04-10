import React, { FC, useState, useRef, memo } from 'react';
import { Image as RNImage, ViewStyle, ImageProps as ImageRNProps, Animated } from 'react-native';
import * as R from 'ramda';
import styles from './styles';
import { View } from 'shared/components/View/View';
import { BorderRadius, Tachyons } from 'shared/types/types';
import getBorderRadiusStyle from 'shared/utils/getBorderRadiusStyle';
import { tachyonsStyles } from 'shared/themes/tachyons';
import { useMount } from 'shared/hooks/useMount';
import { useUnmount } from 'shared/hooks/useUnmount';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import { PinchGestureHandler, PinchGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';

export interface ImageProps extends Omit<ImageRNProps, 'source' | 'defaultSource' | 'borderRadius' | 'style' | 'width' | 'height'> {
  uri?: string;
  preview?: string;
  percentRatio?: string;
  containerStyle?: ViewStyle;
  borderRadius?: BorderRadius;
  tachyons?: Tachyons;
  height?: number | string;
  width?: number | string;
  zoomEnabled?: boolean;
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
  zoomEnabled = false,
  ...rest
}) => {
  const [percentRatioState, setPercentRatioState] = useState(percentRatio || '75%');
  const [isPreviewLoaded, setPreviewLoaded] = useState(false);
  const [isUriLoaded, setUriLoaded] = useState(false);
  const req = useRef(-1);
  const checkHeight = R.path(['height'], containerStyle);
  const { styled } = useTheme();
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = Animated.multiply(baseScale, pinchScale);
  const lastScale = useRef(1);

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

  const handleZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: pinchScale },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleZoomStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
      if (lastScale.current < 1) {
        Animated.spring(baseScale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        lastScale.current = 1;
      }
      if (lastScale.current > 4) {
        Animated.spring(baseScale, {
          toValue: 4,
          useNativeDriver: true,
        }).start();
        lastScale.current = 4;
      }
    }
  };

  const renderImage = () => {
    if (zoomEnabled) {
      return (
        <PinchGestureHandler onGestureEvent={handleZoomEvent} onHandlerStateChange={handleZoomStateChange}>
          <Animated.Image
            {...rest}
            resizeMode={resizeMode}
            source={{ uri }}
            style={[
              tachyonsStyles.absolute,
              tachyonsStyles.absoluteFill,
              tachyonsStyles.z2,
              {
                transform: [{ perspective: 200 }, { scale }],
              },
            ]}
            onLoadEnd={handleLoadEnd}
          />
        </PinchGestureHandler>
      );
    }
    return (
      <RNImage
        {...rest}
        resizeMode={resizeMode}
        source={{ uri }}
        style={[tachyonsStyles.absolute, tachyonsStyles.absoluteFill, tachyonsStyles.z2]}
        onLoadEnd={handleLoadEnd}
      />
    );
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
      {!checkHeight && <View style={{ paddingTop: percentRatioState }} />}
      {!!preview && !isUriLoaded && (
        <RNImage
          source={{ uri: preview }}
          resizeMode={resizeMode}
          style={[tachyonsStyles.absolute, tachyonsStyles.absoluteFill, tachyonsStyles.z1]}
          onLoadEnd={handlePreviewLoadEnd}
          blurRadius={1}
        />
      )}
      {isPreviewLoaded && !!uri && renderImage()}
    </View>
  );
};

export const Image = memo(ImageComponent);
