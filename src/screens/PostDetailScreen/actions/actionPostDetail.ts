import { createAsyncAction, createAction, createDispatchAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { PostDetail } from 'api/PostDetail';
import { RelatedPosts } from 'api/RelatedPosts';
import { TextSize } from 'components/FontSizeConfig/FontSizeConfig';
import { PostFavorite } from 'api/Favorite';
import { PostFavoriteEndpoint, PostViewEndpoint } from 'api/Endpoint';

export interface PostViewRequest {
  endpoint: PostViewEndpoint;
  postEndpoint: string;
  postID: number;
}

export const postDetailAction = {
  mounted: createAction('@postDetailMounted', (endpoint: string, postEndpoint: string, postID: number) => ({
    endpoint,
    postEndpoint,
    postID,
  })),
};

export const getPostDetail = createAsyncAction(['@getPostDetailRequest', '@getPostDetailSuccess', '@getPostDetailFailure'])<
  string,
  { data: PostDetail; endpoint: string },
  { message: string; endpoint: string }
>();

export const getRelatedPosts = createAsyncAction([
  '@getRelatedPostsRequest',
  '@getRelatedPostsSuccess',
  '@getRelatedPostsFailure',
  '@getRelatedPostsCancel',
])<{ endpoint: string }, { data: RelatedPosts; endpoint: string }, { message: string; endpoint: string }>();

export const getFavorite = createAsyncAction(['@getFavoriteRequest', '@getFavoriteSuccess', '@getFavoriteFailure'])<
  {
    endpoint: PostFavoriteEndpoint;
    postEndpoint: string;
    postID: number;
  },
  { isAdded: PostFavorite['isAdded']; postEndpoint: string },
  { message: string; postEndpoint: string }
>();

export const postFavorite = createAsyncAction(['@postFavoriteRequest', '@postFavoriteSuccess', '@postFavoriteFailure'])<
  { endpoint: PostFavoriteEndpoint; postEndpoint: string; postID: number; callback?: (isAdded: boolean) => void },
  { isAdded: boolean; postEndpoint: string },
  { message: string; postEndpoint: string }
>();

export const postView = createAsyncAction(['@postViewRequest', '@postViewSuccess', '@postViewFailure', '@postViewCancel'])<
  PostViewRequest,
  { postEndpoint: string },
  null
>();

export const changePostTextSize = createAction('@changePostTextSize', (size: TextSize) => ({ size }));

export const changePostDetailTutorial = createAction('@changePostDetailTutorial');

export const usePostDetailMounted = createDispatchAction(postDetailAction.mounted);

export const useChangePostTextSize = createDispatchAction(changePostTextSize);

export const usePostFavorite = createDispatchAsyncAction(postFavorite);

export const useGetFavorite = createDispatchAsyncAction(getFavorite);

export const usePostView = createDispatchAsyncAction(postView);

export const useGetRelatedPosts = createDispatchAsyncAction(getRelatedPosts);

export const useGetPostDetailRequest = createDispatchAction(getPostDetail.request);

export const useChangePostDetailTutorial = createDispatchAction(changePostDetailTutorial);
