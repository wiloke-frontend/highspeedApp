import { createSelector } from 'reselect';
import { PostDefaultProps } from 'types/PostDefaultProps';
import { isEmpty } from 'ramda';

export const postDetailsSelector = (state: AppState) => state.postDetails;
export const postDetailRelatedPostsSelector = (state: AppState) => state.postDetailRelatedPosts;
export const postTextSizeSelector = (state: AppState) => state.postTextSize;
export const historyPostsSelector = createSelector(postDetailsSelector, postDetails => {
  return (isEmpty(postDetails) ? [] : Object.values(postDetails).map(detail => detail?.data || {})) as PostDefaultProps[];
});
export const postDetailTutorialSelector = (state: AppState) => state.postDetailTutorial;
