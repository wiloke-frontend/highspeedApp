import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { View, Text, Icons, useTheme, TextInputMentions } from 'shared';
import { Comment } from 'api/Comment';
import styles from './styles';
import Reaction from './Reaction';
import i18n from 'utils/functions/i18n';
import Avatar from 'components/Avatar/Avatar';
import { getTagHighlightValuesFromDraftJs } from 'utils/functions/supportDraftJs';

type AllProps = Pick<Comment, 'author' | 'description' | 'title'>;

interface CommentCardProps extends AllProps {
  containerStyle?: StyleProp<ViewStyle>;
  liked?: boolean;
  reaction?: boolean;
  isReply?: boolean;
  loading?: string;
  isEdit?: boolean;
  createAt: string;
  onReply?: () => void;
  onLike?: () => void;
  onRetry?: () => void;
  onCancel?: () => void;
  renderReply?: () => ReactNode;
  onLongPress?: TouchableOpacityProps['onLongPress'];
}

function CommentCard({
  description,
  author,
  reaction,
  isReply,
  containerStyle = {},
  onReply = () => {},
  renderReply,
  loading,
  createAt,
  isEdit,
  onCancel,
  onRetry = () => {},
  ...otherProps
}: CommentCardProps) {
  const fontSize = isReply ? 'small' : 'h8';
  const { colors } = useTheme();

  const renderTextMentions = () => {
    if (typeof description === 'string') return <Text>{description}</Text>;
    const value = description.blocks.map(item => item.text).join('');
    const entityMap = getTagHighlightValuesFromDraftJs(description);
    return (
      <TextInputMentions
        readonly
        value={value}
        entityMap={entityMap}
        inputStyle={styles.highlight}
        mentionStyle={[styles.mentionName, { color: colors.dark1 }]}
      />
    );
  };

  return (
    <View style={[containerStyle, styles.container]}>
      <TouchableOpacity {...otherProps} activeOpacity={0.8}>
        <View flexDirection="row" flexWrap="nowrap">
          <View style={styles.avatar}>
            <Avatar uri={author.avatar} name={author.displayName || 'Wiloke'} size={isReply ? 20 : 40} />
          </View>
          <View flexWrap="wrap" flex>
            <View style={styles.content} flexDirection={'row'} flex flexWrap="wrap" alignItems="center">
              <View backgroundColor={isEdit ? 'gray1' : 'gray3'} style={styles.descripText}>
                <Text type="h7" color="dark1">
                  {author.displayName || author.email}
                </Text>
                {renderTextMentions()}
              </View>
              {!!reaction && <Reaction nameIcon="thumbs-up" countLike={1} />}
            </View>
            <View flexDirection="row" alignItems="center" flexWrap="nowrap" style={styles.bottom}>
              <Text type="h8" color="dark3">
                {createAt}
              </Text>
              {/* <Text type={fontSize} color={!liked ? 'dark3' : 'primary'} style={styles.ph5} onPress={onLike}>
                {i18n.t('like')}
              </Text> */}
              <Text type={fontSize} color="dark3" style={styles.ph5} onPress={onReply}>
                {i18n.t('reply')}
              </Text>
              {isEdit && (
                <TouchableOpacity onPress={onCancel}>
                  <Text type={fontSize} color="primary" style={styles.ph5}>
                    {i18n.t('cancel')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {renderReply && <View style={{ paddingVertical: 7, paddingLeft: 50 }}>{renderReply()}</View>}
      {loading === 'failure' && (
        <TouchableOpacity style={styles.error} onLongPress={onRetry}>
          <Icons.Feather name="alert-circle" color="danger" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CommentCard;
