import { isEmpty } from 'ramda';
import { UserComment } from 'api/Comment';
import { EntityMap, Range } from 'shared';

export interface EntityMapValue {
  type: 'mention';
  mutability: 'SEGMENTED';
  data: {
    mention: {
      id: number;
      avatar: string;
      displayName: string;
      email: string;
      name: string;
      link: string;
    };
  };
}

export interface EntityMapDraf {
  [key: string]: EntityMapValue;
}
interface RangeDraf extends Range {
  key: number;
}

export interface Block {
  key: string;
  text: string;
  type: 'unstyled';
  depth: number;
  inlineStyleRanges: unknown[];
  entityRanges: RangeDraf[];
  data: {};
}

export function getDraftJsResultFromTagHighlight({ value, entityMap }: { value: string; entityMap: EntityMap<UserComment>[] }) {
  const ranges = entityMap.map((item, index) => ({
    ...item.range,
    key: index,
  }));
  const mentions = entityMap.map(item => item.mentions);
  if (!value) {
    return {
      blocks: [],
      entityMap: [],
    };
  }
  return {
    blocks: [
      {
        key: String(Date.now()),
        text: value,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: ranges,
        data: {},
      } as Block,
    ],
    entityMap: Object.assign(
      {},
      ...mentions.map((mention, index) => {
        return {
          [String(index)]: {
            type: 'mention',
            mutability: 'SEGMENTED',
            data: {
              mention: mention,
            },
          },
        };
      }),
    ),
  };
}

export function getTagHighlightValuesFromDraftJs({ entityMap, blocks }: { entityMap: EntityMapDraf; blocks: Block[] }) {
  const ranges = blocks.flatMap(item => item.entityRanges);
  if (isEmpty(entityMap)) return [];
  return ranges.map(item => {
    return {
      range: item,
      mentions: entityMap[item.key].data.mention,
    };
  });
}

// entityMap: Object.assign(
//   {},
//   ...tags.map<EntityMap>((tag, index) => {
//     return {
//       [String(index)]: {
//         type: 'mention',
//         mutability: 'SEGMENTED',
//         data: {
//           mention: {
//             id: tag.id,
//             avatar: userObj[tag?.id]?.avatar ?? '',
//             name: tag.text,
//             link: userObj[tag.id]?.link ?? '',
//             token: tag.token,
//           },
//         },
//       },
//     };
//   }),
// ),
