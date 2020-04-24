import { watchAsyncAction } from 'utils/functions/reduxActions/helpers';
import fetchAPI from 'utils/functions/fetchAPI';
import { getPostComment, GetCommentSuccess } from '../../actions/actionComments';
import { AxiosResponse } from 'axios';

const watchGetComments = watchAsyncAction({
  fetch: fetchAPI,
  sagaEffect: 'takeLeading',
  asyncAction: getPostComment,
  axiosConfig: payload => ({
    url: payload.endpoint,
    params: {
      ...payload.params,
      postsPerPage: 20,
      orderBy: 'date',
      order: 'DESC',
    },
  }),
  success: (res: AxiosResponse<GetCommentSuccess>) => {
    return res.data;
  },
  failure: () => 'Not found',
});
export default watchGetComments;
