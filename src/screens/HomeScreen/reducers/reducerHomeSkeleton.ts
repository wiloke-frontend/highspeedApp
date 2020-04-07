import { Home } from 'api/Home';
import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { getHomeSkeleton } from 'screens/HomeScreen/actions/actionHome';

type HomeSkeletonAction = ActionTypes<typeof getHomeSkeleton>;

type HomeSkeletonState = ReducerState<Home['data']>;

const initialState: HomeSkeletonState = {
  data: [],
};

export const homeSkeleton = createReducer<HomeSkeletonState, HomeSkeletonAction>(
  initialState,
  handleAsyncAction(['@getHomeSkeletonRequest', '@getHomeSkeletonSuccess', '@getHomeSkeletonFailure']),
);
