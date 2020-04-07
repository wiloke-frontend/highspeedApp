import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { getHomeSectionNavigations, DataSectionNavigationsAll } from 'screens/HomeScreen/actions/actionHome';

type HomeSectionNavigationsAction = ActionTypes<typeof getHomeSectionNavigations>;

type HomeSectionNavigationsState = ReducerState<DataSectionNavigationsAll>;

const initialState: HomeSectionNavigationsState = {
  data: {},
};

export const homeSectionNavigations = createReducer<HomeSectionNavigationsState, HomeSectionNavigationsAction>(
  initialState,
  handleAsyncAction(['@getHomeSectionNavigationsRequest', '@getHomeSectionNavigationsSuccess', '@getHomeSectionNavigationsFailure']),
);
