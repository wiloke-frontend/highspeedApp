import { call, put, select, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { deleteComment, DeleteCommentSuccess } from '../../actions/actionComments';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';

function* handleDeleteComment({ payload }: ReturnType<typeof deleteComment.request>) {
  try {
    const res: AxiosResponse<DeleteCommentSuccess> = yield call(fetchAPI.request, {
      method: 'delete',
      url: payload.endpoint,
    });
    if (res.data.status === 'success') {
      yield put(deleteComment.success({ msg: res.data.msg, id: res.data.data.comment.id }));
      // yield delay(250);
      const newComments = yield select((state: AppState) => state.postComments);
      payload?.cb?.({ status: newComments.statusDelete, message: newComments.messageDelete });
    } else {
      yield put(deleteComment.failure('Sorry, Delete failed'));
      const newComments = yield select((state: AppState) => state.postComments);
      payload?.cb?.({ status: newComments.statusDelete, message: newComments.messageDelete });
    }
  } catch (err) {
    console.log(err.response);
    yield put(deleteComment.failure('Sorry, Delete failed'));
  }
}

function* watchDeleteComment() {
  yield takeLatest(getActionType(deleteComment.request), handleDeleteComment);
}
export default watchDeleteComment;
