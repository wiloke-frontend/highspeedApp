import React from 'react';
import { View } from 'shared';
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { User, TextInputMentionsProps } from './types';
import { isEmpty, includes } from 'ramda';
import { toAlphabetLowerCase } from './utils';

export interface ListUserProps<UserT>
  extends Pick<
    TextInputMentionsProps<UserT>,
    'users' | 'renderUserItem' | 'keyExtractor' | 'hideUserMentioned' | 'keyForMention' | 'readonly' | 'entityMap'
  > {
  containerStyle?: StyleProp<ViewStyle>;
  search: string;
  onItemPress: (user: UserT) => void;
}

function ListUser<UserT extends User>({
  users = [],
  containerStyle = {},
  readonly = false,
  renderUserItem,
  keyExtractor,
  hideUserMentioned,
  keyForMention,
  search,
  entityMap,
  onItemPress,
}: ListUserProps<UserT>) {
  const getMentions = () => {
    return entityMap.map(item => item.mentions);
  };

  return (
    <View style={containerStyle}>
      {!isEmpty(users) &&
        !readonly &&
        users.map((user: UserT, index: number) => {
          const mentions = getMentions();
          const at = search.charAt(0);
          const searchNotAt = search.replace(new RegExp(`^${at}`, 'g'), '');
          const checkHideUserMentioned = hideUserMentioned && includes(user, mentions);
          const atOnly = at && !searchNotAt;
          const userHasSearch = toAlphabetLowerCase(user[keyForMention]).includes(toAlphabetLowerCase(searchNotAt) || '*');

          if (checkHideUserMentioned || (!atOnly && !userHasSearch)) {
            return null;
          }
          return (
            <TouchableOpacity
              key={keyExtractor(user, index)}
              activeOpacity={1}
              onPress={() => {
                onItemPress?.(user);
              }}
            >
              {renderUserItem?.(user, index)}
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

export default ListUser;
