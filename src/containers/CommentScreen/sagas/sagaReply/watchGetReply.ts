import { put, call, takeLeading } from 'redux-saga/effects';
import fetchAPI from 'utils/functions/fetchAPI';
import { AxiosResponse } from 'axios';
import { getActionType } from 'utils/functions/reduxActions';
import { getReplyComments, ReplySuccess } from 'containers/CommentScreen/actions/actionReplyComents';
import { getChildComment } from 'containers/CommentScreen/actions/actionComments';

function* handleGetReply({ payload }: ReturnType<typeof getReplyComments.request>) {
  try {
    const res: AxiosResponse<ReplySuccess> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      params: {
        ...payload.params,
        postsPerPage: 20,
        order: 'DESC',
      },
    });
    const childComments = res.data.data.filter((_, index) => index < 3);
    const childCommentTotal = res.data.data.length;
    yield put(getReplyComments.success(res.data));
    if (!!payload.parentID) {
      yield put(getChildComment({ childComments, childCommentTotal, parentID: payload?.parentID }));
    }
  } catch (err) {
    console.log(err);
    yield put(getReplyComments.failure('Not found'));
  }
}

function* watchGetReply() {
  yield takeLeading(getActionType(getReplyComments.request), handleGetReply);
}
export default watchGetReply;
