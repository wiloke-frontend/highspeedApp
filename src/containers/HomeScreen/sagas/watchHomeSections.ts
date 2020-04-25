import { call, put, all, fork, takeLatest, CallEffect } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getHomeSections, DataSectionAll } from 'containers/HomeScreen/actions/actionHome';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Home } from 'api/Home';
import fetchAPI from 'utils/functions/fetchAPI';
import { PLUCK } from 'utils/constants/constants';
import { HomeSection } from 'api/HomeSection';
import selectDataHomeSkeleton from './_selectDataHomeSkeleton';
import getObjectFromResponse from './_getObjectFromResponse';
import { Categories } from 'api/Categories';

function* handleSections(dataHomeSkeleton: Home['data']) {
  try {
    const resHomeSections: (AxiosResponse<HomeSection | Categories> | string)[] = yield all(
      dataHomeSkeleton.reduce<(CallEffect | string)[]>((arr, sectionSkeleton) => {
        return [
          ...arr,
          ...[
            sectionSkeleton.uid,
            call(fetchAPI.request, {
              url: sectionSkeleton.endpoint,
              params:
                sectionSkeleton.moduleType === 'appCategories'
                  ? {
                      taxonomy: sectionSkeleton.params.taxonomy,
                    }
                  : {
                      ...sectionSkeleton.params,
                      pluck: PLUCK,
                    },
            } as AxiosRequestConfig),
          ],
        ];
      }, []),
    );
    // const dataHomeSections = dataHomeSkeleton.reduce((obj, sectionSkeleton, index) => {
    //   return {
    //     ...obj,
    //     [sectionSkeleton.uid]: resHomeSections[index].data.data,
    //   };
    // }, {});
    // const dataHomeSections: DataSectionAll = getObjectFromResponse<string, AxiosResponse<HomeSection>>(resHomeSections);

    const dataHomeSections: DataSectionAll = getObjectFromResponse<string, AxiosResponse<HomeSection | Categories>>(resHomeSections, 'section');
    yield put(getHomeSections.success(dataHomeSections));
  } catch (err) {
    console.log(err.response);
    yield put(getHomeSections.failure('Loi cmnnr'));
  }
}

export default function* watchHomeSections() {
  yield takeLatest(getActionType(getHomeSections.request), function*() {
    const dataHomeSkeleton: Home['data'] = yield selectDataHomeSkeleton();
    yield fork(handleSections, dataHomeSkeleton);
  });
}
