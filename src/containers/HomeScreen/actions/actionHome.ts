import { createAction, createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { Home, HomeDataItemParams } from 'api/Home';
import { HomeSectionDataItem } from 'api/HomeSection';
import { HomeSectionNavigation } from 'api/HomeSectionNavigation';
import { YoutubeListVideo } from 'api/YoutubeListVideo';
import { Category } from 'api/Categories';
import { HomeAppEndpoint, ArticlesEndpoint, TermsEndpoint, NavTabEndpoint } from 'api/Endpoint';

export interface DataSectionAll {
  [uid: string]: {
    all: {
      status: ReducerStatus;
      data: HomeSectionDataItem[] | Category[];
      message: string;
    };
    [key: string]: {
      status: ReducerStatus;
      data: HomeSectionDataItem[] | Category[];
      message: string;
    };
  };
}

export interface DataSectionNavigationsAll {
  [uid: string]: HomeSectionNavigation['data'];
}

export interface DataNavigationPostsAll {
  [uid: string]: {
    [endpoint: string]: ReducerState<Home['data']>;
  };
}

export interface YoutubeListAll {
  [uid: string]: YoutubeListVideo['items'];
}

export interface SectionCategories {
  [uid: string]: Category[];
}

export const homeAction = {
  homeMounted: createAction('@homeMounted'),
};

export const getHomeSkeleton = createAsyncAction(['@getHomeSkeletonRequest', '@getHomeSkeletonSuccess', '@getHomeSkeletonFailure'])<
  HomeAppEndpoint,
  Home['data'],
  string
>();

export const getHomeSections = createAsyncAction(['@getHomeSectionsRequest', '@getHomeSectionsSuccess', '@getHomeSectionsFailure'])<
  ArticlesEndpoint | TermsEndpoint | '',
  DataSectionAll,
  string
>();

export const getHomeSectionNavigations = createAsyncAction([
  '@getHomeSectionNavigationsRequest',
  '@getHomeSectionNavigationsSuccess',
  '@getHomeSectionNavigationsFailure',
])<NavTabEndpoint | '', DataSectionNavigationsAll, string>();

export const getYoutubeList = createAsyncAction(['@getYoutubeListRequest', '@getYoutubeListSuccess', '@getYoutubeListFailure'])<
  string,
  YoutubeListAll,
  string
>();

export const getNavigationPosts = createAsyncAction(['@getNavigationPostsRequest', '@getNavigationPostsSuccess', '@getNavigationPostsFailure'])<
  { uid: string; endpoint: string; params: HomeDataItemParams },
  { uid: string; endpoint: string; data: HomeSectionDataItem[] },
  { uid: string; endpoint: string; message: string }
>();

export const useHomeMounted = createDispatchAction(homeAction.homeMounted);

export const useGetHomeSectionsRequest = createDispatchAction(getHomeSections.request);

export const useGetHomeSectionNavigationsRequest = createDispatchAction(getHomeSectionNavigations.request);

export const useGetHomeNavigationPostsRequest = createDispatchAction(getNavigationPosts.request);
