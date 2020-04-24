import { createSelector } from 'reselect';
import { isEmpty } from 'ramda';
import { Post } from 'api/Post';

export const postDetailsSelector = (state: AppState) => state.postDetails;
export const postDetailRelatedPostsSelector = (state: AppState) => state.postDetailRelatedPosts;
export const postTextSizeSelector = (state: AppState) => state.postTextSize;
export const historyPostsSelector = createSelector(postDetailsSelector, postDetails => {
  return (isEmpty(postDetails) ? [] : Object.values(postDetails).map(detail => detail?.data || {})) as Post[];
});
export const postDetailTutorialSelector = (state: AppState) => state.postDetailTutorial;
