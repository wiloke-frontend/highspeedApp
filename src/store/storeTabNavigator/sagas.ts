import { watchAsyncAction } from 'utils/functions/reduxActions/helpers';
import fetchAPI from 'utils/functions/fetchAPI';
import { getTabNavigator } from './actions';
import { AxiosResponse } from 'axios';
import { TabNavigator } from 'api/TabNavigator';

export const watchTabNavigator = watchAsyncAction({
  fetch: fetchAPI,
  sagaEffect: 'takeLatest',
  asyncAction: getTabNavigator,
  axiosConfig: payload => ({
    url: payload.endpoint,
  }),
  success: (res: AxiosResponse<TabNavigator>) => {
    return res.data.data;
  },
  failure: () => 'Error',
});
