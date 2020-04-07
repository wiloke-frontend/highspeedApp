import { TextStyle } from 'react-native';
import { groupWith, pipe, map, type } from 'ramda';
import isIOS from 'shared/utils/isIOS';
import { ReactNode } from 'react';

export function checkInRange(source: number, from: number, to: number) {
  return source > from && source < to;
}

export function toAlphabetLowerCase(souce: string) {
  return souce
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, m => (m === 'đ' ? 'd' : 'D'))
    .toLowerCase();
}

export function getInputFakePaddingVerticalValue(value: string): TextStyle['paddingVertical'] {
  const checkTextMultipeLine = /\n/g.test(value);
  const forIos = 7;
  const forAndroid = checkTextMultipeLine ? 5 : 10;
  return isIOS ? forIos : forAndroid;
}

export function joinStringInArray(source: ReactNode[]) {
  return pipe(
    groupWith<ReactNode>((x, y) => type(x) === 'String' && type(y) === 'String'),
    map<ReactNode[], ReactNode>(item => (item.length === 1 ? item[0] : item.join(''))),
  )(source);
}
