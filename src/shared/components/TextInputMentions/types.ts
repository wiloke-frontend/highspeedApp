import { ReactNode, LegacyRef } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputSelectionChangeEventData, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type Selection = TextInputSelectionChangeEventData['selection'];
export type SelectionChangeEvent = NativeSyntheticEvent<TextInputSelectionChangeEventData>;

export interface User {
  [key: string]: any;
}

export interface Range {
  offset: number;
  length: number;
}

export interface EntityMap<UserT> {
  mentions: UserT;
  range: Range;
}

export interface OnChangeParams<UserT> {
  value: string;
  entityMap: EntityMap<UserT>[];
}

export interface TextInputMentionsProps<UserT> {
  users: UserT[];
  hideUserMentioned: boolean;
  onChange: ({ value, entityMap }: OnChangeParams<UserT>) => void;
  readonly: boolean;
  withChar: string;
  value: string;
  entityMap: EntityMap<UserT>[];
  containerStyle: StyleProp<ViewStyle>;
  inputContainerStyle: StyleProp<ViewStyle>;
  userContainerStyle: StyleProp<ViewStyle>;
  mentionStyle: StyleProp<TextStyle>;
  inputStyle: StyleProp<Omit<TextStyle, 'position' | 'top' | 'right' | 'bottom' | 'left'>>;
  keyForMention: string;
  inputRef: LegacyRef<TextInput>;
  placeholder: string;
  placeholderTextColor: string;
  renderUserItem: (user: UserT, index: number) => ReactNode;
  keyExtractor: (user: UserT, index: number) => string;
}

export interface TextInputMentionsState<UserT> {
  value: string;
  prevValue: string;
  textAddedLength: number;
  entityMap: EntityMap<UserT>[];
  selection: Selection;
  search: string;
  atPosition: number;
}
