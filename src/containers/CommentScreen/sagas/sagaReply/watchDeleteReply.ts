import { call, put, select, takeLatest } from 'redux-saga/effects';
import { deleteReply, DeleteReplySuccess } from 'containers/CommentScreen/actions/actionReplyComents';
import fetchAPI from 'utils/functions/fetchAPI';
import { getChildComment } from 'containers/CommentScreen/actions/actionComments';
import { AxiosResponse } from 'axios';
import { getActionType } from 'utils/functions/reduxActions';

function* handleDeleteReply({ payload }: ReturnType<typeof deleteReply.request>) {
  try {
    const res: AxiosResponse<DeleteReplySuccess> = yield call(fetchAPI.request, {
      method: 'delete',
      url: payload.endpoint,
    });
    if (res.data.status === 'success') {
      yield put(deleteReply.success({ msg: res.data.msg, id: res.data.data.comment.id }));
      const newReply = yield select((state: AppState) => state.replyComments);
      const childComments = newReply.data.filter((_: unknown, index: number) => index < 3);
      const childCommentTotal = newReply.data.length;
      yield put(getChildComment({ childComments, childCommentTotal, parentID: payload.parentID }));
      payload?.cb?.({ status: newReply.statusDelete, message: newReply.messageDelete });
    } else {
      yield put(deleteReply.failure('Sorry, Delete failed'));
      const newComments = yield select((state: AppState) => state.postComments);
      payload?.cb?.({ status: newComments.statusDelete, message: newComments.messageDelete });
    }
  } catch (err) {
    console.log(err);
    yield put(deleteReply.failure('Sorry, Delete failed'));
  }
}

function* watchDelReply() {
  yield takeLatest(getActionType(deleteReply.request), handleDeleteReply);
}

export default watchDelReply;
