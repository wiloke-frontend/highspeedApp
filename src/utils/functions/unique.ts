// export default function getUnique<ItemT extends {}>(list: ItemT[], condition: string) {
//   return list
//     .map(item => item[condition])
//     .map((item, index, final) => final.indexOf(item) === index && index)
//     .filter(e => list[e])
//     .map(e => list[e]);
// }

export interface ItemDefault {
  [key: string]: any;
}

export default function getUnique<ItemT extends ItemDefault>(list: ItemT[], condition: string) {
  return Object.values<ItemT>(
    list.reduceRight((obj, item) => {
      return {
        ...obj,
        [item[condition]]: item,
      };
    }, {}),
  );
}
// export function getUniqueSet<ItemT extends ItemDefault>(list: ItemT[], key: string) {
//   return [...new Set(list.map(item => item[key]))].map<ItemT>(key => list.find(item => item[key] === key) ?? []);
// }

export function getUniqueSet<T extends ItemDefault>(list: T[], key: keyof T) {
  return [...new Set(list.map(item => item[key]))].map<T>(unique => {
    return list.find(item => item[key] === unique) as T;
  });
}
