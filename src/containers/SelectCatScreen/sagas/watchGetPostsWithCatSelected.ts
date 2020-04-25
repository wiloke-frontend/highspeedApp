import fetchAPI from 'utils/functions/fetchAPI';
import { getPostsWithCatSelected } from 'containers/SelectCatScreen/actions/actionGetPostsWithCatSelected';
import { AxiosResponse } from 'axios';
import { PLUCK } from 'utils/constants/constants';
import { Search } from 'api/Search';
import { watchAsyncAction } from 'utils/functions/reduxActions/helpers';

export const watchGetPostsWithCatSelected = watchAsyncAction({
  fetch: fetchAPI,
  sagaEffect: 'takeLeading',
  asyncAction: getPostsWithCatSelected,
  axiosConfig: payload => ({
    url: payload.endpoint,
    params: {
      ...payload.params,
      pluck: PLUCK,
    },
  }),
  success: (res: AxiosResponse<Search>) => {
    return res.data;
  },
  failure: () => 'Error',
});
