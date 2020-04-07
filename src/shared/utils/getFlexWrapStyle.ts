import { FlexWrap } from 'shared/types/types';
import { tachyonsStyles as tachyons } from 'shared/themes/tachyons';

export default function getFlexWrapStyle(flexWrap: FlexWrap) {
  switch (flexWrap) {
    case 'nowrap':
      return tachyons.flexNowrap;
    case 'wrap-reverse':
      return tachyons.flexWrapReverse;
    case 'wrap':
      return tachyons.flexWrap;
    default:
      return tachyons.empty;
  }
}
