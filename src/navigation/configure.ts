import HomeScreen from 'screens/HomeScreen/HomeScreen';
import PostDetailScreen from 'screens/PostDetailScreen/PostDetailScreen';
import SearchScreen from 'screens/SearchScreen/SearchScreen';
import SelectCatScreen from 'screens/SelectCatScreen/SelectCatScreen';
import PostsScreen from 'screens/PostsScreen/PostsScreen';
import NotifyScreen from 'screens/NotifyScreen/NotifyScreen';
import CategoryScreen from 'screens/CategoryScreen/CategoryScreen';
import ProfileScreen from 'screens/ProfileScreen/ProfileScreen';
import MenuScreen from 'screens/MenuScreen/MenuScreen';
import HistoryPostsScreen from 'screens/HistoryPostsScreen/HistoryPostsScreen';
import CommentScreen from 'screens/CommentScreen/CommentsScreen';
import ReplyScreen from 'screens/CommentScreen/ReplyScreen';
import ChangePasswordScreen from 'screens/ChangePasswordScreen/ChangePasswordScreen';

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
