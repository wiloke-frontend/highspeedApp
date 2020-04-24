import { AxiosResponse } from 'axios';

function getNumber(num1: number, num2: number) {
  return num1 < num2 ? num1 : num2;
}

export default function getObjectFromResponse<TKey extends string, TValue extends AxiosResponse<{ data?: any; items?: any }>>(
  source: (TKey | TValue)[],
  type: 'section' | 'default',
) {
  return source.reduce((obj, _item, index) => {
    const even = getNumber(index * 2, source.length - 2);
    const odd = getNumber(index * 2 + 1, source.length - 1);
    const key = source[even] as TKey;
    const value = !!(source as TValue[])[odd].data?.data ? (source as TValue[])[odd].data?.data : (source as TValue[])[odd].data?.items;
    if (type === 'section') {
      return {
        ...obj,
        [key]: {
          all: {
            status: 'success',
            data: value,
          },
        },
      };
    }
    return {
      ...obj,
      [key]: value,
    };
  }, {});
}
