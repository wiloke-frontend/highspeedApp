import { call, put, all, fork, takeLatest, CallEffect } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getYoutubeList, YoutubeListAll } from 'containers/HomeScreen/actions/actionHome';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Home } from 'api/Home';
import fetchAPI from 'utils/functions/fetchAPI';
import { YoutubeListVideo } from 'api/YoutubeListVideo';
import selectDataHomeSkeleton from './_selectDataHomeSkeleton';
import getObjectFromResponse from './_getObjectFromResponse';
import configureApp from 'utils/constants/configureApp';

const YOUTUBE_BASEURL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_KEY = configureApp.settings?.youtubeKey;

function* handleSectionYoutubeList(dataHomeSkeleton: Home['data']) {
  try {
    const videoYoutubeList: (AxiosResponse<YoutubeListVideo> | string)[] = yield all(
      dataHomeSkeleton.reduce<(CallEffect | string)[]>((arr, sectionSkeleton) => {
        return [
          ...arr,
          // kiểm tra xem có tồn tại videoIds để fetch không
          ...(!!sectionSkeleton?.video?.videoIds || !!sectionSkeleton?.video?.videoPlayListId
            ? [
                sectionSkeleton.uid,
                call(fetchAPI.request, {
                  url: `${YOUTUBE_BASEURL}/${!!sectionSkeleton?.video?.videoIds ? 'videos' : 'playlistItems'}`,
                  params: {
                    key: YOUTUBE_KEY,
                    ...(!!sectionSkeleton?.video?.videoIds
                      ? { id: sectionSkeleton?.video?.videoIds }
                      : { playlistId: sectionSkeleton?.video?.videoPlayListId }),
                    maxResults: 50,
                    part: 'snippet,contentDetails',
                  },
                } as AxiosRequestConfig),
              ]
            : []),
        ];
      }, []),
    );

    const dataHomeSectionYoutube: YoutubeListAll = getObjectFromResponse<string, AxiosResponse<YoutubeListVideo>>(videoYoutubeList, 'default');
    yield put(getYoutubeList.success(dataHomeSectionYoutube));
  } catch (err) {
    console.log('TCL: function*handleSectionYoutubeList -> err', err.response);
    yield put(getYoutubeList.failure('Error'));
  }
}

export default function* watchSectionYoutubeList() {
  yield takeLatest(getActionType(getYoutubeList.request), function*() {
    const dataHomeSkeleton: Home['data'] = yield selectDataHomeSkeleton();
    yield fork(handleSectionYoutubeList, dataHomeSkeleton);
  });
}
