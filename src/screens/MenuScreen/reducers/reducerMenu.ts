import { ActionTypes, createReducer } from 'utils/functions/reduxActions';
import { getMenu } from '../actions/actionMenu';
import { Menu } from 'api/Menu';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';

type MenuAction = ActionTypes<typeof getMenu>;

type MenuState = ReducerState<Menu['data']>;

const initialState: MenuState = {
  data: [],
};

export const menu = createReducer<MenuState, MenuAction>(initialState, handleAsyncAction(['@getMenuRequest', '@getMenuSuccess', '@getMenuFailure']));
