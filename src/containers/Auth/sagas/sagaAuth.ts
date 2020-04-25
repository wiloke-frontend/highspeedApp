import watchAuth from './watchAuthentication';
import watchForgetPassword from './watchForgetPassword';
import watchChangePassword from './watchChangePassword';
import watchLoginFacebook from './watchLoginFacebook';
import watchLoginApple from './watchLoginApple';

const sagaAuth = [watchAuth, watchForgetPassword, watchLoginApple, watchChangePassword, watchLoginFacebook];

export default sagaAuth;
// function* handleGetProfile({ payload }: ReturnType<typeof getProfile.request>) {
//   try {
//     const res: AxiosResponse<UserProfile> = yield call(fetchAPI.request, {
//       url: payload,
//       params: {
//         pluck: PLUCK_PROFILE,
//       },
//     });
//     yield put(getProfile.success(res.data));
//   } catch (err) {
//     console.log(err);
//     yield put(getProfile.failure('Something went to error'));
//   }
// }

// function* watchGetProfile() {
//   yield takeLatest(getActionType(getProfile.request), handleGetProfile);
// }
