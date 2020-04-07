import React, { ComponentType, forwardRef } from 'react';
import { Tachyons } from 'shared/types/types';
import { getTachyonsStyle } from 'shared/utils/getTachyonsStyle';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';

export interface WithTachyonsProps {
  tachyons?: Tachyons;
  style?: StyleProp<ViewStyle | TextStyle>;
}

export function withTachyons<R, P extends object>(Component: ComponentType<P>, styleProp = 'style') {
  const WithTachyons = forwardRef<R, P & WithTachyonsProps>(({ tachyons = [], style, ...rest }, ref) => {
    return <Component ref={ref} {...(rest as P)} {...{ [styleProp]: [getTachyonsStyle(tachyons), style] }} />;
  });

  WithTachyons.displayName = `WithTachyons ${getDisplayNameHOC(Component)}`;

  return WithTachyons;
}
