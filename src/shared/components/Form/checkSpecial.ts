import { LengthType, PresenceType, SpecialType } from './types';

interface CheckSpecialType {
  length?: LengthType;
  presence?: PresenceType;
  special?: SpecialType;
  value: any;
  required?: boolean;
}

function checkSpecial({ length, presence, special, value, required }: CheckSpecialType) {
  return (
    !!special &&
    ((!length && value.length > 0 && required) ||
      (!length && !presence && value.length >= 0) ||
      (!required && value.length > 0) ||
      (!!length && !presence && value.length > 0) ||
      (!!length && !!presence && required && value.length > 0))
  );
}

export default checkSpecial;
