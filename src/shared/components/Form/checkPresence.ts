import { PresenceType } from './types';

interface CheckPresenceType {
  presence?: PresenceType;
  required?: boolean;
  value: any;
}

function checkPresence({ presence, required, value }: CheckPresenceType) {
  return !!presence && !!required && value.length <= 0;
}

export default checkPresence;
