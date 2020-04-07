import { ViewStyle, StyleSheet } from 'react-native';
import { BorderRadius } from 'shared/types/types';
import { tachyonsStyles as tachyons } from 'shared/themes/tachyons';

const styles = StyleSheet.create({
  br4: {
    borderRadius: 4,
  },
});

export default function getBorderRadiusStyle(borderRadius: BorderRadius): ViewStyle {
  if (typeof borderRadius === 'number') {
    return {
      borderRadius,
    };
  }
  switch (borderRadius) {
    case 'round':
      return styles.br4;
    case 'pill':
      return tachyons.brPill;
    default:
      return {};
  }
}
