import { JustifyContent } from 'shared/types/types';
import { tachyonsStyles as tachyons } from 'shared/themes/tachyons';

export default function getJustifyContentStyle(justifyContent: JustifyContent) {
  switch (justifyContent) {
    case 'flex-start':
      return tachyons.justifyStart;
    case 'flex-end':
      return tachyons.justifyEnd;
    case 'center':
      return tachyons.justifyCenter;
    case 'space-around':
      return tachyons.justifyAround;
    case 'space-between':
      return tachyons.justifyBetween;
    case 'space-evenly':
      return tachyons.justifyEvenly;
    default:
      return tachyons.empty;
  }
}
