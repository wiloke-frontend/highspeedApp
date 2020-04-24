import { searchChange } from 'screens/SearchScreen/actions/actionSearch';
import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { Post } from 'api/Post';

type SearchChangeAction = ActionTypes<typeof searchChange>;

type SearchChangeState = ReducerState<Post[]>;

const initialState: SearchChangeState = {
  data: [],
};

export const searchResult = createReducer<SearchChangeState, SearchChangeAction>(
  initialState,
  handleAsyncAction(['@searchChangeRequest', '@searchChangeSuccess', '@searchChangeFailure']),
);
