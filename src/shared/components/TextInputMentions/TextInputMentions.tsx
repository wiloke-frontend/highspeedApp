import React, { PureComponent } from 'react';
import { View } from 'shared';
import { TextInput } from 'react-native';
import { isEmpty, insert, equals } from 'ramda';
import isIOS from 'shared/utils/isIOS';
import { checkInRange, getInputFakePaddingVerticalValue } from './utils';
import { SelectionChangeEvent, User, Range, TextInputMentionsProps, TextInputMentionsState } from './types';
import styles from './styles';
import TextHighlight from './TextHighlight';
import ListUser from './ListUser';

export class TextInputMentions<UserT extends User> extends PureComponent<TextInputMentionsProps<UserT>, TextInputMentionsState<UserT>> {
  static defaultProps: TextInputMentionsProps<any> = {
    users: [],
    renderUserItem: () => null,
    keyExtractor: (_, index) => String(index),
    hideUserMentioned: true,
    onChange: () => {},
    onPressMention: () => {},
    readonly: false,
    withChar: '@',
    value: '',
    entityMap: [],
    containerStyle: {},
    inputContainerStyle: {},
    userContainerStyle: {},
    inputStyle: {},
    mentionStyle: {
      backgroundColor: '#dce6f8',
    },
    keyForMention: 'name',
    inputRef: null,
    placeholder: '',
    placeholderTextColor: '#888',
  };

  constructor(props: TextInputMentionsProps<UserT>) {
    super(props);
    this.state = {
      value: props.value,
      prevValue: '',
      textAddedLength: 0,
      entityMap: props.entityMap,
      selection: { start: 0, end: 0 },
      search: '',
      atPosition: -1,
    };
  }

  public componentDidUpdate(prevProps: TextInputMentionsProps<UserT>, prevState: TextInputMentionsState<UserT>) {
    const { onChange, value: valueProp, entityMap: entityMapProp } = this.props;
    const { value, entityMap } = this.state;

    if (prevProps.value !== valueProp) {
      this.setState({
        value: valueProp,
      });
    }
    if (!equals(prevProps.entityMap, entityMapProp)) {
      this.setState({
        entityMap: entityMapProp,
      });
    }
    if (prevState.value !== value || !equals(prevState.entityMap, entityMap)) {
      onChange({ value, entityMap });
    }
  }

  private getCaretPosition = () => {
    const { selection } = this.state;
    return isIOS ? selection.start : selection.start + 1;
  };

  private handleDeleteText = () => {
    const { value, entityMap, textAddedLength } = this.state;
    const caretPosition = this.getCaretPosition();
    const isTextSelected = textAddedLength < -1;
    const WTF_androidFrom = isIOS ? 1 : -1;
    const WTF_androidTo = isIOS ? 0 : 2;

    // trường hợp offset nằm trong đoạn đang bôi đen
    const checkOffsetInnerSelection = (range: Range) => checkInRange(range.offset - WTF_androidFrom, caretPosition, caretPosition - textAddedLength);
    // trường hợp length nằm trong đoạn đang bôi đen
    const checkLengthInnerSelection = (range: Range) =>
      checkInRange(range.offset + range.length + WTF_androidTo, caretPosition, caretPosition - textAddedLength);
    // trường hợp đoạn bôi đen nằm trong range
    const checkSelectionInnerRange = (range: Range) =>
      range.offset - WTF_androidFrom < caretPosition && caretPosition - textAddedLength < range.offset + range.length + WTF_androidTo;

    const newEntityMap = entityMap.filter(({ range }) => {
      if (isTextSelected) {
        return !checkOffsetInnerSelection(range) && !checkLengthInnerSelection(range) && !checkSelectionInnerRange(range);
      }
      return !checkInRange(caretPosition, range.offset - WTF_androidFrom, range.offset + range.length + WTF_androidTo);
    });
    const entityMapDeleted = entityMap.filter(({ range }) => {
      if (isTextSelected) {
        return checkOffsetInnerSelection(range) && checkLengthInnerSelection(range) && checkSelectionInnerRange(range);
      }
      return checkInRange(caretPosition, range.offset - WTF_androidFrom, range.offset + range.length + WTF_androidTo);
    })[0];

    this.setState({
      entityMap: newEntityMap,
    });
    if (!!entityMapDeleted?.range) {
      const { range } = entityMapDeleted;
      const newValue = value
        .split('')
        .filter((_, index) => !checkInRange(index, range.offset - 1, range.offset + range.length))
        .join('');
      this.setState({
        value: newValue,
        textAddedLength: -(range.length + 1),
      });
    }
  };

  private handleUpdateRangeOffset = () => {
    const { value, entityMap, textAddedLength } = this.state;
    const caretPosition = this.getCaretPosition();
    if (caretPosition >= value.length && isEmpty(entityMap)) {
      return;
    }
    this.setState({
      entityMap: entityMap.map(({ range, mentions }) => {
        const newRange = caretPosition <= range.offset + 1 ? { ...range, offset: range.offset + textAddedLength } : range;
        return {
          mentions,
          range: newRange,
        };
      }),
    });
  };

  private setValueAsync = (value: string) => {
    return new Promise(resolve => {
      this.setState({ value }, resolve);
    });
  };

  private setTextAddedLengthAsync = (value: string, prevValue: string) => {
    return new Promise(resolve => {
      this.setState({ textAddedLength: value.length - prevValue.length }, resolve);
    });
  };

  private handleAddTextInnerRange = () => {
    const caretPosition = this.getCaretPosition();
    this.setState(prevState => ({
      entityMap: prevState.entityMap.filter(({ range }) => {
        return !checkInRange(caretPosition, range.offset, range.offset + range.length);
      }),
    }));
  };

  private handleSearch = () => {
    const { withChar } = this.props;
    const { value } = this.state;
    const caretPosition = this.getCaretPosition();
    const valueHasAt = value.includes(withChar);
    const reg = new RegExp(`.*(?=${withChar})`, 'g');
    let searchValue = valueHasAt
      ? value
          .replace(/\n/g, '')
          .substring(0, caretPosition)
          .replace(reg, '')
      : '';
    searchValue = searchValue.charAt(1) === ' ' ? '' : searchValue;
    this.setState({
      search: searchValue,
      atPosition: value.substring(0, caretPosition).length,
    });
  };

  private handleChangeText = async (text: string) => {
    const { value: prevValue } = this.state;
    await this.setValueAsync(text);
    await this.setTextAddedLengthAsync(text, prevValue);
    if (text.length <= prevValue.length) {
      this.handleDeleteText();
    } else {
      this.handleAddTextInnerRange();
    }
    this.handleUpdateRangeOffset();
    this.handleSearch();
  };

  private insertNewItemEntityMap = (user: UserT) => {
    const { keyForMention } = this.props;
    const { search, entityMap, atPosition } = this.state;
    const newItem = {
      mentions: user,
      range: {
        offset: atPosition - search.length,
        length: user[keyForMention].length,
      },
    };
    this.setState({
      entityMap: insert(atPosition, newItem, entityMap),
      search: '',
    });
  };

  private handleUserItemPress = (user: UserT) => {
    const { keyForMention } = this.props;
    const { value, entityMap, search, atPosition } = this.state;
    const newEntityMap = entityMap.map(({ range, mentions }) => {
      const condition = atPosition < value.length && atPosition <= range.offset + 1;
      const newRange = condition ? { ...range, offset: range.offset + user[keyForMention].length - search.length } : range;
      return {
        mentions,
        range: newRange,
      };
    });
    const newValue = insert(
      atPosition - search.length,
      user[keyForMention],
      (value.substr(0, atPosition - search.length) + value.substr(atPosition)).split(''),
    ).join('');

    this.setState(
      {
        value: newValue,
        entityMap: newEntityMap,
        textAddedLength: user[keyForMention].length,
      },
      () => {
        this.insertNewItemEntityMap(user);
      },
    );
  };

  private handleSelectionChange = (event: SelectionChangeEvent) => {
    this.setState({
      selection: event.nativeEvent.selection,
    });
  };

  private renderInput = () => {
    const { readonly, inputStyle, inputRef, placeholder, placeholderTextColor } = this.props;
    const { value } = this.state;
    if (readonly) {
      return null;
    }
    return (
      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle, styles.inputImportant]}
        multiline
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={this.handleChangeText}
        onSelectionChange={this.handleSelectionChange}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
    );
  };

  public render() {
    const {
      users,
      inputStyle,
      containerStyle,
      inputContainerStyle,
      userContainerStyle,
      readonly,
      mentionStyle,
      hideUserMentioned,
      keyForMention,
      keyExtractor,
      renderUserItem,
      onPressMention,
    } = this.props;
    const { value, entityMap, search } = this.state;
    return (
      <View style={containerStyle}>
        <ListUser
          entityMap={entityMap}
          users={users}
          readonly={readonly}
          keyForMention={keyForMention}
          keyExtractor={keyExtractor}
          renderUserItem={renderUserItem}
          hideUserMentioned={hideUserMentioned}
          search={search}
          containerStyle={userContainerStyle}
          onItemPress={this.handleUserItemPress}
        />
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this.renderInput()}
          <TextHighlight
            onPressHighlightEnabled={readonly}
            value={value}
            entityMap={entityMap}
            mentionStyle={mentionStyle}
            containerStyle={[
              styles.input,
              inputStyle,
              readonly ? {} : styles.inputFakeImportant,
              readonly ? {} : { paddingVertical: getInputFakePaddingVerticalValue(value) },
            ]}
            onPressHighlight={onPressMention}
          />
        </View>
      </View>
    );
  }
}
