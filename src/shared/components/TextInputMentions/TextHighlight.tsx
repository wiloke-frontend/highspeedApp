import React, { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text } from 'shared';
import { checkInRange, joinStringInArray } from './utils';
import { User, TextInputMentionsProps } from './types';
import { isEmpty } from 'ramda';

export interface TextHighlightProps<UserT> extends Pick<TextInputMentionsProps<UserT>, 'mentionStyle' | 'entityMap' | 'value'> {
  containerStyle?: StyleProp<TextStyle>;
}

function TextHighlight<UserT extends User>({ value, mentionStyle = {}, entityMap, containerStyle = {} }: TextHighlightProps<UserT>) {
  return (
    <Text style={containerStyle}>
      {joinStringInArray(
        value.split('').map((char, index) => {
          for (let i = 0; i < entityMap.length; i++) {
            const condition =
              checkInRange(index, entityMap[i].range.offset - 1, entityMap[i].range.offset + entityMap[i].range.length) &&
              !!entityMap[i]?.mentions &&
              !isEmpty(entityMap[i].mentions);
            if (condition) {
              return (
                <Text key={String(index)} style={mentionStyle}>
                  {char}
                </Text>
              );
            }
          }
          return char;
        }),
      )}
    </Text>
  );
}

export default memo(TextHighlight);
