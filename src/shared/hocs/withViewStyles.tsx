import React, { ComponentType, forwardRef, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Tailwind, Flex, JustifyContent, AlignItems, FlexDirection, FlexWrap, Column, Color, Tachyons } from 'shared/types/types';
import { getTailwindStyle } from 'shared/utils/getTailwindStyle';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import getFlexWrapStyle from 'shared/utils/getFlexWrapStyle';
import getJustifyContentStyle from 'shared/utils/getJustifyContentStyle';
import getFlexStyle from 'shared/utils/getFlexStyle';
import getColumnStyle from 'shared/utils/getColumnStyle';
import getFlexDirectionStyle from 'shared/utils/getFlexDirectionStyle';
import getAlignItemsStyle from 'shared/utils/getAlignItemsStyle';
import { getTachyonsStyle } from 'shared/utils/getTachyonsStyle';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';

export interface WithViewStylesProps {
  tailwind?: Tailwind;
  tachyons?: Tachyons;
  flex?: Flex | boolean;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  column?: Column;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: Color;
  children?: ReactNode;
}

export function withViewStyles<R, P extends object>(Component: ComponentType<P>, styleProp = 'style') {
  const WithViewStyles = forwardRef<R, P & WithViewStylesProps>(
    (
      {
        tailwind = [],
        tachyons = [],
        backgroundColor = 'transparent',
        flex = false,
        justifyContent,
        alignItems,
        flexDirection,
        column,
        flexWrap,
        style = {},
        ...rest
      },
      ref,
    ) => {
      const { colors } = useTheme();
      const flexStyle = getFlexStyle(flex);
      const justifyContentStyle = getJustifyContentStyle(justifyContent);
      const alignItemsStyle = getAlignItemsStyle(alignItems);
      const flexDirectionStyle = getFlexDirectionStyle(flexDirection);
      const columnStyle = !!column ? getColumnStyle(column) : {};
      const flexWrapStyle = getFlexWrapStyle(flexWrap);
      const inlineStyle = { backgroundColor: !!colors[backgroundColor] ? colors[backgroundColor] : backgroundColor };
      const styles = [
        flexStyle,
        justifyContentStyle,
        alignItemsStyle,
        flexDirectionStyle,
        flexWrapStyle,
        columnStyle,
        inlineStyle,
        getTailwindStyle(tailwind),
        getTachyonsStyle(tachyons),
        style,
      ];

      return <Component ref={ref} {...(rest as P)} {...{ [styleProp]: styles }} />;
    },
  );

  WithViewStyles.displayName = `WithViewStyles(${getDisplayNameHOC(Component)})`;

  return WithViewStyles;
}
