import { call, put, all, fork, takeLatest, CallEffect } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getHomeSectionNavigations, DataSectionNavigationsAll } from 'screens/HomeScreen/actions/actionHome';
import { AxiosResponse } from 'axios';
import { Home } from 'api/Home';
import fetchAPI from 'utils/functions/fetchAPI';
import { HomeSectionNavigation } from 'api/HomeSectionNavigation';
import selectDataHomeSkeleton from './_selectDataHomeSkeleton';
import getObjectFromResponse from './_getObjectFromResponse';

function* handleNavigations(dataHomeSkeleton: Home['data']) {
  try {
    const resHomeSectionNavigations: (AxiosResponse<HomeSectionNavigation> | string)[] = yield all(
      dataHomeSkeleton.reduce<(CallEffect | string)[]>((arr, sectionSkeleton) => {
        return [
          ...arr,
          ...(!!sectionSkeleton?.navigation?.endpoint
            ? [
                sectionSkeleton.uid,
                call(fetchAPI.request, {
                  url: sectionSkeleton?.navigation?.endpoint,
                  params: sectionSkeleton?.navigation?.params,
                }),
              ]
            : []),
        ];
      }, []),
    );
    const dataHomeSectionNavigations: DataSectionNavigationsAll = getObjectFromResponse(resHomeSectionNavigations, 'default');
    // console.log(123, dataHomeSectionNavigations2);
    // const dataHomeSectionNavigations: DataSectionNavigationsAll = getObjectDataFromResponse(
    //   resHomeSectionNavigations,
    //   dataHomeSkeleton.reduce((arr, sectionSkeleton) => {
    //     return [...arr, ...(!!sectionSkeleton?.navigation?.endpoint ? [sectionSkeleton.uid] : [])];
    //   }, []),
    // );
    yield put(getHomeSectionNavigations.success(dataHomeSectionNavigations));
  } catch (err) {
    console.log(err.response);
    yield put(getHomeSectionNavigations.failure('Loi cmnnr'));
  }
}

export default function* watchSectionNavigations() {
  yield takeLatest(getActionType(getHomeSectionNavigations.request), function*() {
    const dataHomeSkeleton: Home['data'] = yield selectDataHomeSkeleton();
    yield fork(handleNavigations, dataHomeSkeleton);
  });
}
