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

// Tab screen và các màn hình thuộc tab đó
const HomeTabNavigator = {
  HomeScreen,
  HomePostsScreen: PostsScreen,
};

const MyPostsNavigator = {
  SelectCatScreen,
};

const NotifyNavigator = {
  NotifyScreen,
};

const SearchNavigator = {
  SearchScreen,
};

const CategoryNavigator = {
  CategoryScreen,
};

const MenuNavigator = {
  MenuScreen,
};

// Tab lớn nhất
export const rootTabNavigators = {
  HomeTabNavigator,
  MyPostsNavigator,
  NotifyNavigator,
  SearchNavigator,
  CategoryNavigator,
  MenuNavigator,
};

// Stack ngang hàng với root tab
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
