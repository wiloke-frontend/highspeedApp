import fetchAPI from 'utils/functions/fetchAPI';
import { getPostsWithParams } from 'screens/PostsScreen/actions/actionPosts';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { PLUCK } from 'utils/constants/constants';
import { Search } from 'api/Search';
import { takeLeading, call, put } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

function* handlePostWithParams({ payload }: ReturnType<typeof getPostsWithParams.request>) {
  try {
    const res: AxiosResponse<Search> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      params: {
        ...payload.params,
        pluck: PLUCK,
      },
    } as AxiosRequestConfig);
    yield put(getPostsWithParams.success(res.data));
  } catch (err) {
    console.log(err.request);
    yield put(getPostsWithParams.failure('Error'));
  }
}

function* watchGetPostsWithParams() {
  yield takeLeading(getActionType(getPostsWithParams.request), handlePostWithParams);
}

const sagaPostsScreen = [watchGetPostsWithParams];

export default sagaPostsScreen;
