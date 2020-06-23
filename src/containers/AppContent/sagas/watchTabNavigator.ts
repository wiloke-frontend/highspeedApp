import { watchAsyncAction } from 'utils/functions/reduxActions/helpers';
import fetchAPI from 'utils/functions/fetchAPI';
import { getTabNavigator } from '../actions/actionTabNavigator';
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
  failure: err => {
    console.log(111, err);
    return 'Error';
  },
});
