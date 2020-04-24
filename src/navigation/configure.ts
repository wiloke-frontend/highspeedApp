import HomeScreen from 'containers/HomeScreen/HomeScreen';
import PostDetailScreen from 'containers/PostDetailScreen/PostDetailScreen';
import SearchScreen from 'containers/SearchScreen/SearchScreen';
import SelectCatScreen from 'containers/SelectCatScreen/SelectCatScreen';
import PostsScreen from 'containers/PostsScreen/PostsScreen';
import NotifyScreen from 'containers/NotifyScreen/NotifyScreen';
import CategoryScreen from 'containers/CategoryScreen/CategoryScreen';
import ProfileScreen from 'containers/ProfileScreen/ProfileScreen';
import MenuScreen from 'containers/MenuScreen/MenuScreen';
import HistoryPostsScreen from 'containers/HistoryPostsScreen/HistoryPostsScreen';
import CommentScreen from 'containers/CommentScreen/CommentsScreen';
import ReplyScreen from 'containers/CommentScreen/ReplyScreen';
import ChangePasswordScreen from 'containers/ChangePasswordScreen/ChangePasswordScreen';

// RootTab
export const rootTabNavigators = {
  HomeTabNavigator: {
    HomeScreen,
    HomePostsScreen: PostsScreen,
  },
  MyPostsNavigator: {
    SelectCatScreen,
  },
  NotifyNavigator: {
    NotifyScreen,
  },
  SearchNavigator: {
    SearchScreen,
  },
  CategoryNavigator: {
    CategoryScreen,
  },
  MenuNavigator: {
    MenuScreen,
  },
};

// Stack ngang hàng với RootTab
export const rootStackNavigators = {
  SearchScreen,
  Comments: CommentScreen,
  PostsScreen,
  PostDetailNotGetureDistance: PostDetailScreen,
  ProfileScreen,
  HistoryPostsScreen,
  MenuProfileScreen: ProfileScreen,
  MenuNotifyScreen: NotifyScreen,
  MenuCategoryScreen: CategoryScreen,
  MenuMyPostsScreen: SelectCatScreen,
  MenuSearchScreen: SearchScreen,
  ReplyScreen,
  ChangePasswordScreen,
};
