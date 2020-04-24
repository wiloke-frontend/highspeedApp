import { createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { TabNavigator } from 'api/TabNavigator';
import { TabNavigatorEndpoint } from 'api/Endpoint';

export const getTabNavigator = createAsyncAction(['@getTabNavigatorRequest', '@getTabNavigatorSuccess', '@getTabNavigatorFailure'])<
  {
    endpoint: TabNavigatorEndpoint;
  },
  TabNavigator['data'],
  string
>();

export const useGetTabNavigatorRequest = createDispatchAction(getTabNavigator.request);
