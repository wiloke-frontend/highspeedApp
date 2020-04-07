import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { getCategories } from 'store/storeCategories/actions/actionCategories';
import { Categories } from 'api/Categories';

type CategoriesAction = ActionTypes<typeof getCategories>;

type CategoriesState = ReducerState<Categories>;

const initialState: CategoriesState = {
  data: {
    status: '',
    data: [],
  },
};

export const categories = createReducer<CategoriesState, CategoriesAction>(
  initialState,
  handleAsyncAction(['@getCategoriesRequest', '@getCagegoriesSuccess', '@getCategoriesFailure']),
);
