import { Flex } from 'shared/types/types';
import { tachyonsStyles as tachyons } from 'shared/themes/tachyons';

export default function getFlexStyle(flex: Flex | boolean) {
  if (typeof flex === 'boolean') {
    return flex ? tachyons.flex : {};
  }
  if (typeof flex === 'number') {
    return { flex };
  }
  return {};
}
