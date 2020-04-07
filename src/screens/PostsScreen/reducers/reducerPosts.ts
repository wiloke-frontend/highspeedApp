import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { getPostsWithParams } from 'screens/PostsScreen/actions/actionPosts';
import { Search } from 'api/Search';
import handleAsyncActionCustom from 'utils/functions/handleAsyncActionCustom';

type PostsWithParamsAction = ActionTypes<typeof getPostsWithParams>;

type PostsWithParamsState = ReducerState<Partial<Search>>;

const initialState: PostsWithParamsState = {
  data: {
    data: [],
  },
  pageNext: 1,
};

export const postsWithParams = createReducer<PostsWithParamsState, PostsWithParamsAction>(
  initialState,
  handleAsyncActionCustom(['@getPostsWithParamsRequest', '@getPostsWithParamsSuccess', '@getPostsWithParamsFailure']),
);
