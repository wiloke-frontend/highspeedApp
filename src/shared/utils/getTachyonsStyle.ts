import { tachyonsStyles } from 'shared/themes/tachyons';
import { Tachyons } from 'shared/types/types';

export const getTachyonsStyle = (tachyons: Tachyons) => {
  return typeof tachyons === 'string' ? tachyonsStyles[tachyons] : tachyons.map(style => tachyonsStyles[style]);
};
