import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { Search } from 'api/Search';
import handleAsyncActionCustom from 'utils/functions/handleAsyncActionCustom';
import { getPostsWithCatSelected } from '../actions/actionGetPostsWithCatSelected';

type PostsWithCatSelectedAction = ActionTypes<typeof getPostsWithCatSelected>;

type PostsWithCatSelectedState = ReducerState<Partial<Search>>;

const initialState: PostsWithCatSelectedState = {
  data: {
    data: [],
  },
  pageNext: 1,
};

export const postsWithCatSelected = createReducer<PostsWithCatSelectedState, PostsWithCatSelectedAction>(
  initialState,
  handleAsyncActionCustom(['@getPostsWithCatSelectedRequest', '@getPostsWithCatSelectedSuccess', '@getPostsWithCatSelectedFailure']),
);
