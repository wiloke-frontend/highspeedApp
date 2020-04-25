import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { getHomeSections, getNavigationPosts, DataSectionAll } from 'containers/HomeScreen/actions/actionHome';

type HomeSectionsAction = ActionTypes<typeof getHomeSections | typeof getNavigationPosts>;

type HomeSectionsState = ReducerState<DataSectionAll>;

const initialState: HomeSectionsState = {
  data: {},
};

export const homeSections = createReducer<HomeSectionsState, HomeSectionsAction>(initialState, [
  ...handleAsyncAction(['@getHomeSectionsRequest', '@getHomeSectionsSuccess', '@getHomeSectionsFailure']),
  handleAction('@getNavigationPostsRequest', (state, action) => {
    state.data[action.payload.uid][action.payload.endpoint] = {
      ...state.data[action.payload.uid][action.payload.endpoint],
      status: 'loading',
    };
    return state;
  }),
  handleAction('@getNavigationPostsSuccess', (state, action) => {
    state.data[action.payload.uid][action.payload.endpoint] = {
      ...state.data[action.payload.uid][action.payload.endpoint],
      status: 'success',
      data: action.payload.data,
    };
    return state;
  }),
  handleAction('@getNavigationPostsFailure', (state, action) => {
    state.data[action.payload.uid][action.payload.endpoint] = {
      ...state.data[action.payload.uid][action.payload.endpoint],
      status: 'failure',
      message: action.payload.message,
    };
    return state;
  }),
]);
