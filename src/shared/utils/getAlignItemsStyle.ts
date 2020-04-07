import { AlignItems } from 'shared/types/types';
import { tachyonsStyles as tachyons } from 'shared/themes/tachyons';

export default function getAlignItemsStyle(alignItems: AlignItems) {
  switch (alignItems) {
    case 'flex-start':
      return tachyons.itemsStart;
    case 'flex-end':
      return tachyons.itemsEnd;
    case 'center':
      return tachyons.itemsCenter;
    case 'baseline':
      return tachyons.itemsBaseline;
    case 'stretch':
      return tachyons.itemsStretch;
    default:
      return {};
  }
}
