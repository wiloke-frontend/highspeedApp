import invert from 'invert-color';

interface ObjectColor {
  [key: string]: string;
}

export default function invertObjectColorHex(objectColor: ObjectColor) {
  return Object.entries(objectColor).reduce<ObjectColor>((obj, [key, value]) => {
    return {
      ...obj,
      [key]: invert(value),
    };
  }, {});
}
