import React, { useRef, useState, ReactNode } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import styles from './styles';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

const IOS = Platform.OS === 'ios';

type TouchableProps = Omit<
  TouchableOpacityProps,
  'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'
>;

interface RippleButtonProps extends TouchableProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: TouchableOpacityProps['onPress'];
  onLongPress?: TouchableOpacityProps['onLongPress'];
  onPressOut?: TouchableOpacityProps['onPressOut'];
  onPressIn?: TouchableOpacityProps['onPressIn'];
  rectButtonProps?: RectButtonProperties;
}

const maxOpacity = 0.15;
const MAX_DIAMETER = 200;

function RippleButton({
  children,
  style,
  onLongPress = () => {},
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  rectButtonProps,
  ...otherProps
}: RippleButtonProps) {
  const scaleValue = useRef(new Animated.Value(0));
  const opacityValue = useRef(new Animated.Value(0));
  const opacityBackgroundValue = useRef(new Animated.Value(0));
  const [diameter, setDiameter] = useState(MAX_DIAMETER);
  const [layout, setLayout] = useState({ pressX: 0, pressY: 0 });
  const longPress = useRef(true);

  // const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 });
  const setDefaultAnimatedValues = () => {
    // We can set up scale to 0 and opacity back to maxOpacity
    scaleValue.current.setValue(0);
    opacityValue.current.setValue(maxOpacity);
  };

  const _onLongPress = (event: GestureResponderEvent) => {
    longPress.current = true;
    Animated.parallel([
      Animated.timing(opacityBackgroundValue.current, {
        toValue: maxOpacity / 2,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue.current, {
        toValue: 0,
        duration: 125 + diameter,
        useNativeDriver: true,
      }),
      // Scale of ripple effect starts at 0 and goes to 1
      Animated.timing(scaleValue.current, {
        toValue: 1.6,
        duration: 125 + diameter,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
    onLongPress(event);
  };

  const _onPress = (event: GestureResponderEvent) => {
    Animated.parallel([
      // Display background layer thru whole over the view
      Animated.timing(opacityBackgroundValue.current, {
        toValue: maxOpacity / 2,
        duration: 125 + diameter,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      // Opacity of ripple effect starts on maxOpacity and goes to 0
      Animated.timing(opacityValue.current, {
        toValue: 0,
        duration: 125 + diameter,
        useNativeDriver: true,
      }),
      // Scale of ripple effect starts at 0 and goes to 1
      Animated.timing(scaleValue.current, {
        toValue: 1.6,
        duration: 125 + diameter,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After the effect is fully displayed we need background to be animated back to default
      Animated.timing(opacityBackgroundValue.current, {
        toValue: 0,
        duration: 225,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

      setDefaultAnimatedValues();
    });
    onPress(event);
  };

  const _onPressIn = (event: GestureResponderEvent) => {
    const { locationX: pressX, locationY: pressY } = event.nativeEvent;
    setLayout({ pressX, pressY });
    onPressIn(event);
  };

  const _onPressOut = (event: GestureResponderEvent) => {
    if (longPress.current) {
      longPress.current = false;
      Animated.parallel([
        // Hide opacity background layer, slowly. It has to be done later than ripple
        // effect
        Animated.timing(opacityBackgroundValue.current, {
          toValue: 0,
          duration: 500 + diameter,
          useNativeDriver: true,
        }),
        // Opacity of ripple effect starts on maxOpacity and goes to 0
        Animated.timing(opacityValue.current, {
          toValue: 0,
          duration: 125 + diameter,
          useNativeDriver: true,
        }),
        // Scale of ripple effect starts at 0 and goes to 1
        Animated.timing(scaleValue.current, {
          toValue: 1,
          duration: 125 + diameter,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(setDefaultAnimatedValues);
    }
    onPressOut(event);
  };

  const _getLayout = (event: LayoutChangeEvent) => {
    try {
      const { width, height } = event.nativeEvent.layout;
      const diameter = Math.ceil(Math.sqrt(width * width + height * height));
      setDiameter(Math.min(diameter, MAX_DIAMETER));
    } catch (err) {
      setDiameter(MAX_DIAMETER);
    }
  };

  const renderRippleView = () => {
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: (layout.pressY || 0) - diameter / 2.5,
            left: (layout.pressX || 0) - diameter / 2.5,
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            transform: [{ scale: scaleValue.current }],
            opacity: opacityValue.current,
            backgroundColor: 'black',
            zIndex: 1,
          },
        ]}
      />
    );
  };

  const renderOpacityBackground = () => {
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            opacity: opacityBackgroundValue.current,
            backgroundColor: 'black',
            zIndex: 1,
          },
        ]}
      />
    );
  };

  return IOS ? (
    <TouchableOpacity
      {...otherProps}
      onLayout={_getLayout}
      onPressIn={_onPressIn}
      onLongPress={_onLongPress}
      onPressOut={_onPressOut}
      onPress={_onPress}
      activeOpacity={1}
    >
      <View style={[styles.container, style]} pointerEvents="box-none">
        {children}
        {renderOpacityBackground()}
        {renderRippleView()}
      </View>
    </TouchableOpacity>
  ) : (
    <RectButton {...rectButtonProps}>{children}</RectButton>
  );
}

export default RippleButton;
