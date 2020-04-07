import React, { ComponentType, forwardRef } from 'react';
import { Tailwind } from 'shared/types/types';
import { getTailwindStyle } from 'shared/utils/getTailwindStyle';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';

export interface WithTailwindProps {
  tailwind?: Tailwind;
  style?: StyleProp<ViewStyle | TextStyle>;
}

export function withTailwind<R, P extends object>(Component: ComponentType<P>, styleProp = 'style') {
  const WithTailwind = forwardRef<R, P & WithTailwindProps>(({ tailwind = [], style, ...rest }, ref) => {
    return <Component ref={ref} {...(rest as P)} {...{ [styleProp]: [getTailwindStyle(tailwind), style] }} />;
  });

  WithTailwind.displayName = `WithTailwind ${getDisplayNameHOC(Component)}`;

  return WithTailwind;
}
