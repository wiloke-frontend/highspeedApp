import { put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getPostDetail } from 'containers/PostDetailScreen/actions/actionPostDetail';
import { PostDetail } from 'api/PostDetail';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';

type PostDetailRequest = ReturnType<typeof getPostDetail.request>;

function* handlePostDetail({ payload: endpoint }: PostDetailRequest) {
  try {
    const res: AxiosResponse<PostDetail> = yield call(fetchAPI.request, { url: endpoint });
    yield put(getPostDetail.success({ data: res.data, endpoint }));
  } catch {
    yield put(getPostDetail.failure({ message: 'Loi cmmnr', endpoint }));
  }
}

export default function* watchDetailContent() {
  yield takeEvery(getActionType(getPostDetail.request), handlePostDetail);
}
