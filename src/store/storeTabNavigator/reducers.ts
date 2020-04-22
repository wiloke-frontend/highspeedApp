import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { getTabNavigator } from './actions';
import { TabNavigator } from 'api/TabNavigator';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';

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
