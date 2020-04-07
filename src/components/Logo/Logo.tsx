import React, { FC, useState } from 'react';
import { Image, LayoutChangeEvent } from 'react-native';

export interface LogoProps {
  maxHeight?: number;
}

const Logo: FC<LogoProps> = ({ maxHeight = 40 }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    setSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
  };

  return (
    <Image
      source={require('assets/logo.png')}
      onLayout={handleLayout}
      style={[
        size.width === 0 ? {} : { width: (maxHeight * size.width) / size.height, height: maxHeight },
        size.height === 0 ? {} : { height: maxHeight },
        size.width === 0 && size.height === 0 ? { opacity: 0 } : {},
      ]}
    />
  );
};

export default Logo;
