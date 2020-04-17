import postDetails from 'screens/PostDetailScreen/reducers/reducerPostDetails';
import trendingPosts from 'screens/SearchScreen/reducers/reducerTrendingPosts';
import searchResult from 'screens/SearchScreen/reducers/reducerSearchResults';
import { homeSectionYoutubeList } from 'screens/HomeScreen/reducers/reducerYoutubeList';
import { homeSkeleton } from 'screens/HomeScreen/reducers/reducerHomeSkeleton';
import { homeSections } from 'screens/HomeScreen/reducers/reducerHomeSections';
import { homeSectionNavigations } from 'screens/HomeScreen/reducers/reducerHomeSectionNavigations';
import { postDetailRelatedPosts } from 'screens/PostDetailScreen/reducers/reducerPostDetailRelated';
import { categories } from 'store/storeCategories/reducers/reducerCategories';
import { postsWithCatSelected } from 'screens/SelectCatScreen/reducers/reducerPostsWithCatSelected';
import { postTextSize } from 'screens/PostDetailScreen/reducers/reducerPostTextSize';
import { auth } from './storeAuth/reducers/reducerAuth';
import { postComments } from 'screens/CommentScreen/reducers/reducerPostComments';
import { postsWithParams } from 'screens/PostsScreen/reducers/reducerPosts';
import { categoriesSelected } from './storeCategories/reducers/reducerCatSelected';
import { notifications } from 'screens/NotifyScreen/reducers/reducerNotifications';
import { tabNavigator } from './storeTabNavigator/reducers';
import { menu } from 'screens/MenuScreen/reducers/reducerMenu';
import replyComments from 'screens/CommentScreen/reducers/reducerReply';
import { forgetPass } from './storeAuth/reducers/reducerPassword';
import { postDetailTutorial } from 'screens/PostDetailScreen/reducers/reducerPostDetailTutorial';
import { nightMode } from 'screens/ProfileScreen/reducers/reducerNightMode';

const reducers = {
  // general
  categories,
  categoriesSelected,
  postsWithCatSelected,
  tabNavigator,

  // home
  homeSkeleton,
  homeSections,
  homeSectionNavigations,
  homeSectionYoutubeList,

  // post
  postDetails,
  postDetailRelatedPosts,
  postTextSize,
  postDetailTutorial,

  postsWithParams,

  trendingPosts,
  searchResult,
  auth,
  postComments,

  // notifications
  notifications,

  // menu
  menu,

  replyComments,
  forgetPass,
  nightMode,
};

export default reducers;
