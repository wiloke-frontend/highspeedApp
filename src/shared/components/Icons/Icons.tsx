import React, { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { FontAwesome, Feather, MaterialIcons, FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { FontAwesomeNameType } from 'shared/types/FontAwesomeNameType';
import { FeatherNameType } from 'shared/types/FeatherNameType';
import { MaterialIconsNameType } from 'shared/types/MaterialIconsNameType';
import { FontAwesome5NameType } from 'shared/types/FontAwesome5NameType';
import { MCIconsNameType } from 'shared/types/MCIconsNameType';
import { useTheme } from '../ThemeContext/ThemeContext';
import { Color } from 'shared/types/types';
import { AntDesignType } from 'shared/types/AntDesignType';

export interface IconProps<T> {
  name: T;
  size?: number;
  color?: Color;
  colorNative?: string;
  style?: StyleProp<TextStyle>;
}

export const Icons = {
  FontAwesome: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<FontAwesomeNameType>) => {
    const { colors } = useTheme();
    return <FontAwesome {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
  FontAwesome5: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<FontAwesome5NameType>) => {
    const { colors } = useTheme();
    return <FontAwesome5 {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
  Feather: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<FeatherNameType>) => {
    const { colors } = useTheme();
    return <Feather {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
  MaterialIcons: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<MaterialIconsNameType>) => {
    const { colors } = useTheme();
    return <MaterialIcons {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
  MaterialCommunityIcons: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<MCIconsNameType>) => {
    const { colors } = useTheme();
    return <MaterialCommunityIcons {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
  AntDesign: memo(({ color = 'dark2', colorNative, ...rest }: IconProps<AntDesignType>) => {
    const { colors } = useTheme();
    return <AntDesign {...rest} color={!!colorNative ? colorNative : colors[color]} />;
  }),
};
