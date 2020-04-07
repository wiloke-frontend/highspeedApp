import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { homeAction, getHomeSkeleton, getHomeSections, getHomeSectionNavigations, getYoutubeList } from 'screens/HomeScreen/actions/actionHome';
import { AxiosResponse } from 'axios';
import { Home } from 'api/Home';
import fetchAPI from 'utils/functions/fetchAPI';
import watchNavigationSwipe from './watchNavigationSwipe';
import watchSectionYoutubeList from './watchSectionYoutubeList';
import watchSectionNavigations from './watchSectionNavigations';
import watchHomeSections from './watchHomeSections';

function* watchHomeSkeleton() {
  yield takeLatest(getActionType(getHomeSkeleton.request), function*({ payload }: ReturnType<typeof getHomeSkeleton.request>) {
    try {
      const resHomeSkeleton: AxiosResponse<Home> = yield call(fetchAPI.request, { url: payload });
      yield put(getHomeSkeleton.success(resHomeSkeleton.data.data));
      // sau khi getHomeSkeleton hoàn thành thực hiện lấy các sections
      yield put(getHomeSections.request(''));
      yield put(getHomeSectionNavigations.request(''));
      yield put(getYoutubeList.request(''));
    } catch {
      yield put(getHomeSkeleton.failure('Error'));
    }
  });
}

function* watchHomeMounted() {
  yield takeLatest(getActionType(homeAction.homeMounted), function*() {
    yield put(getHomeSkeleton.request('app-home-page'));
  });
}

const sagaHomeScreen = [
  watchHomeMounted,
  watchHomeSkeleton,
  watchHomeSections,
  watchSectionNavigations,
  watchSectionYoutubeList,
  watchNavigationSwipe,
];

export default sagaHomeScreen;
