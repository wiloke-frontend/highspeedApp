import React, { FC, memo } from 'react';
import { View, Container, Divider, Text } from 'shared';
import { CommentScreenParams } from 'containers/CommentScreen/CommentsScreen';
import { PostDetailScreenParams } from 'containers/PostDetailScreen/PostDetailScreen';
import { Notify } from 'api/Notifications';
import { useDeleteNotifyRequest, usePostNotifyRequest } from './actions/actionNotifications';
import timeAgo from 'utils/functions/timeAgo';
import NotifyCard from 'components/NotifyCard/NotifyCard';
import { Link, RouteName } from 'navigation';
import i18n from 'utils/functions/i18n';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ReplyScreenParams } from 'containers/CommentScreen/ReplyScreen';

export interface NotifyItemProps {
  item: Notify;
  index: number;
}

const NotifyItem: FC<NotifyItemProps> = ({ item, index }) => {
  const deleteNotifyRequest = useDeleteNotifyRequest();
  const postNotifyRequest = usePostNotifyRequest();
  const { showActionSheetWithOptions } = useActionSheet();
  const linkTo: RouteName = !!item.parentComment ? 'ReplyScreen' : item.type === 'post' ? 'PostDetailNotGetureDistance' : 'Comments';
  const regexp = /\*_\*_\*_\*.*\*_\*_\*_\*/g;
  const titleReplace = item.title.replace(regexp, '');
  const titleMatch = item.title.match(regexp);
  const titlePost = titleMatch ? titleMatch[0].replace(/\*_\*_\*_\*/g, '') : '';
  const linkParams =
    item.type === 'post'
      ? ({
          slug: item.endpoint,
          title: titlePost,
          id: item.postID,
        } as PostDetailScreenParams)
      : !!item.parentComment
      ? ({
          item: item.parentComment,
          postID: item.postID,
        } as ReplyScreenParams)
      : ({
          id: item.postID,
          title: titlePost,
        } as CommentScreenParams);

  const handleDeleteNotify = (id: number, seen: boolean) => {
    deleteNotifyRequest({ endpoint: 'notifications', id, seen });
  };

  const handleActionSheet = (id: number, seen: boolean) => {
    showActionSheetWithOptions(
      {
        options: [i18n.t('delete'), i18n.t('cancel')],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            return handleDeleteNotify(id, seen);
          default:
            return false;
        }
      },
    );
  };

  if (!item.isExist) {
    return null;
  }

  return (
    <Container>
      <Link
        to={linkTo}
        params={linkParams}
        onBeforeNavigate={() => {
          if (!item.seen) {
            postNotifyRequest({ endpoint: 'notifications', id: item.id });
          }
        }}
      >
        {index === 0 && <Divider />}
        <View tachyons={['ph3', 'pv2']} backgroundColor={item.seen ? 'light' : 'gray3'}>
          <NotifyCard
            avatarUri={item.authorAvatar}
            name={item.authorName}
            Message={
              item.title.includes('*_*_*_*') ? (
                <>
                  {`${titleReplace}`}
                  <Text type="h7">{titlePost}</Text>
                </>
              ) : (
                item.title
              )
            }
            createAt={timeAgo(item.timestamp, item.date)}
            iconName={item.type === 'comment' ? 'message-square' : 'edit-3'}
            onOption={() => handleActionSheet(item.id, item.seen)}
          />
        </View>
        <Divider />
      </Link>
    </Container>
  );
};

export default memo(NotifyItem);
