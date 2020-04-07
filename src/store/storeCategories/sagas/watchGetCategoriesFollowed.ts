import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getCategoriesFollowed } from '../actions/actionFollowCategory';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { Categories } from 'api/Categories';
import { categoriesSelectedIdsSelector } from 'store/selectors';

function* handleGetCategoriesFollowed({ payload }: ReturnType<typeof getCategoriesFollowed.request>) {
  try {
    const res: AxiosResponse<Categories> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    } as AxiosRequestConfig);
    yield put(getCategoriesFollowed.success({ data: res.data.data }));
    const categoriesSelectedIds: number[] = yield select(categoriesSelectedIdsSelector);
    payload.callback?.(categoriesSelectedIds);
  } catch (err) {
    console.log(err.response);
    yield put(getCategoriesFollowed.failure({ message: 'Error' }));
  }
}

export default function* watchGetCategoriesFollowed() {
  yield takeLatest(getActionType(getCategoriesFollowed.request), handleGetCategoriesFollowed);
}
