import React, { memo, ReactNode } from 'react';
import { NavigationSuspense } from 'navigation';
import { FlatList } from 'shared';
import { Comment } from 'api/Comment';
import CommentCard from 'components/CommentCard/CommentCard';
import timeAgo from 'utils/functions/timeAgo';

export interface ParentCommentProps {
  comment: Comment;
  isEdit: boolean;
  onReply: (item: Comment) => void;
  renderReply: () => ReactNode;
}

function ParentComment({ comment, isEdit, onReply, renderReply }: ParentCommentProps) {
  return (
    <NavigationSuspense>
      <FlatList
        data={[comment]}
        renderItem={({ item }) => (
          <CommentCard
            title={item.title}
            author={item.author}
            description={item.description}
            createAt={timeAgo(item.timestamp, item.date)}
            renderReply={renderReply}
            onReply={() => onReply(item)}
          />
        )}
        useContainer
        keyExtractor={(item, _index) => item.id.toString()}
        style={{ paddingHorizontal: 10 }}
        renderToHardwareTextureAndroid={true}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={0}
        keyboardShouldPersistTaps={isEdit ? 'handled' : 'never'}
        keyboardDismissMode="on-drag"
      />
    </NavigationSuspense>
  );
}
export default memo(ParentComment);
