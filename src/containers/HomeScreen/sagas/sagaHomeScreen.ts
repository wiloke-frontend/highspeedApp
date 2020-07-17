import {
  call,
  put,
  takeLatest,
  // all, CallEffect
} from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import {
  homeAction,
  getHomeSkeleton,
  // getHomeSections,
  // getHomeSectionNavigations,
  // getYoutubeList,
  // DataSectionAll,
} from 'containers/HomeScreen/actions/actionHome';
import { AxiosResponse } from 'axios';
import { Home } from 'api/Home';
import fetchAPI from 'utils/functions/fetchAPI';
import watchNavigationSwipe from './watchNavigationSwipe';
import watchSectionYoutubeList from './watchSectionYoutubeList';
import watchSectionNavigations from './watchSectionNavigations';
import watchHomeSections from './watchHomeSections';

// import { PLUCK } from 'utils/constants/constants';
// import { HomeSection } from 'api/HomeSection';
// import { Categories } from 'api/Categories';
// import getObjectFromResponse from './_getObjectFromResponse';

// const count = 1;

function* watchHomeSkeleton() {
  yield takeLatest(getActionType(getHomeSkeleton.request), function*({ payload }: ReturnType<typeof getHomeSkeleton.request>) {
    try {
      const resHomeSkeleton: AxiosResponse<Home> = yield call(fetchAPI.request, { url: payload });
      console.log(resHomeSkeleton);
      yield put(getHomeSkeleton.success(resHomeSkeleton.data.data));
      // sau khi getHomeSkeleton hoàn thành thực hiện lấy các sections
      // const dataHomeSkeleton = resHomeSkeleton.data.data;
      // const resHomeSections: AxiosResponse<HomeSection | Categories>[] = yield all(
      //   dataHomeSkeleton.reduce<(CallEffect | string)[]>((arr, sectionSkeleton, index) => {
      //     return [
      //       ...arr,
      //       ...(index < count
      //         ? [
      //             sectionSkeleton.uid,
      //             call(fetchAPI.request, {
      //               url: sectionSkeleton.endpoint,
      //               params:
      //                 sectionSkeleton.moduleType === 'appCategories'
      //                   ? {
      //                       taxonomy: sectionSkeleton.params.taxonomy,
      //                     }
      //                   : {
      //                       ...sectionSkeleton.params,
      //                       pluck: PLUCK,
      //                     },
      //             } as AxiosRequestConfig),
      //           ]
      //         : []),
      //     ];
      //   }, []),
      // );
      // const dataHomeSections: DataSectionAll = getObjectFromResponse<string, AxiosResponse<HomeSection | Categories>>(resHomeSections, 'section');
      // // console.log(dataHomeSections);
      // yield put(getHomeSections.success(dataHomeSections));
      // yield put(getHomeSections.request(''));
      // yield put(getHomeSectionNavigations.request(''));
      // yield put(getYoutubeList.request(''));
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
