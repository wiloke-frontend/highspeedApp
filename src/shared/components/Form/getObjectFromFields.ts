import { DefaultField } from './types';

function getObjectFromFields<FieldT extends DefaultField, ValueT>(arr: FieldT[], value: ValueT) {
  return arr.reduce<{ [key: string]: ValueT }>((obj, item) => {
    return {
      ...obj,
      [item.name]: value,
    };
  }, {});
}

export default getObjectFromFields;
