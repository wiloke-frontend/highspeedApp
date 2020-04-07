import { ViewStyle } from 'react-native';
import defaultColors from 'shared/themes/defaultColors';
import { tailwindStyles } from 'shared/themes/tailwind';
import { tachyonsStyles } from 'shared/themes/tachyons';

export type Colors = typeof defaultColors;

export type Color = keyof typeof defaultColors;

export type BorderWidth = 1 | 2 | 3;

export type BorderRadius = 'default' | 'round' | 'pill' | number;

export type Size = 'extra-small' | 'small' | 'medium' | 'large';

export type Flex = ViewStyle['flex'];

export type FlexWrap = ViewStyle['flexWrap'];

export type FlexDirection = ViewStyle['flexDirection'];

export type JustifyContent = ViewStyle['justifyContent'];

export type AlignItems = ViewStyle['alignItems'];

export type Column = '1/6' | '2/6' | '3/6' | '4/6' | '5/6' | '6/6';

export type Appearance = 'dark' | 'light';

export type KeyTailwind = keyof typeof tailwindStyles;

export type Tailwind = KeyTailwind | KeyTailwind[];

export type KeyTachyons = keyof typeof tachyonsStyles;

export type Tachyons = KeyTachyons | KeyTachyons[];
