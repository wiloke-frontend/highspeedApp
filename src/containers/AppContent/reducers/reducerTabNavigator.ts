import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { getTabNavigator } from '../actions/actionTabNavigator';
import { TabNavigator } from 'api/TabNavigator';

type TabNavigatorAction = ActionTypes<typeof getTabNavigator>;

type TabNavigatorState = ReducerState<TabNavigator['data']>;

const initialState: TabNavigatorState = {
  data: [
    {
      name: 'home',
      label: 'Home',
      iconName: '',
      enable: true,
      screen: 'HomeTabNavigator',
    },
  ],
};

export const tabNavigator = createReducer<TabNavigatorState, TabNavigatorAction>(
  initialState,
  handleAsyncAction(['@getTabNavigatorRequest', '@getTabNavigatorSuccess', '@getTabNavigatorFailure']),
);
