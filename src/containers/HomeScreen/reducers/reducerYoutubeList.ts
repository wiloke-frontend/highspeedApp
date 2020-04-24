import { createReducer, ActionTypes } from 'utils/functions/reduxActions';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';
import { getYoutubeList, YoutubeListAll } from 'containers/HomeScreen/actions/actionHome';

type YoutubeListAction = ActionTypes<typeof getYoutubeList>;

type HomeSectionsState = ReducerState<YoutubeListAll>;

const initialState: HomeSectionsState = {
  data: {},
};

export const homeSectionYoutubeList = createReducer<HomeSectionsState, YoutubeListAction>(
  initialState,
  handleAsyncAction(['@getYoutubeListRequest', '@getYoutubeListSuccess', '@getYoutubeListFailure']),
);
