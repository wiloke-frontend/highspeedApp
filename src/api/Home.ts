import { ArticlesEndpoint, TermsEndpoint } from './Endpoint';

export interface HomeDataItemParams {
  postType: string;
  numberOfPosts: number;
  orderby: string;
  taxonomy: {
    category: number[];
  };
}

export type HeadingStyle = 'style1' | 'style2' | 'style3' | 'style4' | 'style5' | 'style6';

export interface HomeDataItem {
  endpoint: ArticlesEndpoint | TermsEndpoint;
  moduleType:
    | 'appMagazine01'
    | 'appMagazine02'
    | 'appMagazine03'
    | 'appMagazine04'
    | 'appMagazine05'
    | 'appMagazine06'
    | 'appMagazine07'
    | 'appMagazine08'
    | 'appStandard01'
    | 'appStandard02'
    | 'appGrid01'
    | 'appGrid02'
    | 'appList01'
    | 'appList02'
    | 'appList03'
    | 'appList04'
    | 'appAds'
    | 'appYoutube'
    | 'appCategories';
  uid: string;
  general: {
    magzStyle: string;
    heading: string;
    description: string;
    headingStyle: HeadingStyle;
    backgroundModule: string;
    maxPosts: number;
  };
  params: HomeDataItemParams;
  navigation: {
    endpoint: string;
    params: {
      id: number;
      moduleOrder: number;
      type: string;
    };
  };
  ads: {
    adsImage: string;
    adsLink: string;
  };
  video: {
    useCase: string;
    videoIds: string;
    videoPlayListId: string;
  };
}

export interface Home {
  status: string;
  data: HomeDataItem[];
}
