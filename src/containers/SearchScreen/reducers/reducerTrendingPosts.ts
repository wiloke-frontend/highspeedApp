import { getTrending } from 'containers/SearchScreen/actions/actionSearch';
import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { Posts } from 'api/Posts';

type GetTrendingAction = ActionTypes<typeof getTrending>;

type TrendingPostsState = ReducerState<Posts['data']>;

const initialState: TrendingPostsState = {
  status: 'loading',
  data: [],
  message: '',
};

export const trendingPosts = createReducer<TrendingPostsState, GetTrendingAction>(
  initialState,
  handleAsyncAction(['@getTrendingRequest', '@getTrendingSuccess', '@getTrendingFailure']),
);
