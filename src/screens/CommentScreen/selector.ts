import { createSelector } from 'reselect';
import getUnique from 'utils/functions/unique';

export const commentSelector = (state: AppState) => state.postComments;

export const replySelector = (state: AppState) => state.replyComments;

export const usersCommentSelector = createSelector(commentSelector, commentSelected => {
  const author = commentSelected.data.map(item => item.author);
  return getUnique(author, 'id');
});

export const userReplySelector = createSelector(replySelector, replySelected => {
  const author = replySelected.data.map(item => item.author);
  return getUnique(author, 'id');
});
