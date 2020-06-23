import { ActionTypes, createReducer, handleAction } from 'utils/functions/reduxActions';
import { getRelatedPosts } from 'containers/PostDetailScreen/actions/actionPostDetail';
import { RelatedPosts } from 'api/RelatedPosts';
import getPostDetailMax50 from 'utils/functions/getPostDetailMax50';

type PostDetailRelatedAction = ActionTypes<typeof getRelatedPosts>;

interface PostDetailRelatedState {
  [key: string]: ReducerState<Partial<RelatedPosts>>;
}

const initialState: PostDetailRelatedState = {};

export const postDetailRelatedPosts = createReducer<PostDetailRelatedState, PostDetailRelatedAction>(initialState, [
  handleAction('@getRelatedPostsRequest', (state, action) => {
    state[action.payload.endpoint] = {
      ...state[action.payload.endpoint],
      status: 'loading',
    };
    return state;
  }),
  handleAction('@getRelatedPostsSuccess', (state, action) => {
    state[action.payload.endpoint].status = 'success';
    state[action.payload.endpoint].data = action.payload.data;
    return getPostDetailMax50(state);
  }),
  handleAction('@getRelatedPostsFailure', (state, action) => {
    state[action.payload.endpoint].status = 'failure';
    state[action.payload.endpoint].message = action.payload.message;
    return state;
  }),
]);
