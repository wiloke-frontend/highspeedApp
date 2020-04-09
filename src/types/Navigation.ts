import { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Post } from 'api/Post';
import { ScreenParams } from './ScreenParams';
import { PostWithParams } from 'screens/PostsScreen/actions/actionPosts';

export interface PostDetailScreenParams
  extends Pick<Post, 'id' | 'slug' | 'title' | 'dateFull' | 'author' | 'previewFeaturedImage' | 'featuredImage'> {}
export interface CommentScreenParams {
  id: number;
  title: string;
}
export interface PostsScreenParams {
  requestParams: Partial<PostWithParams>;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  HomeScreen: undefined;
  SearchScreen: ScreenParams;
  ProfileScreen: any;
  ChangePasswordScreen: any;
  HistoryPostsScreen: any;
  PostsScreen: PostsScreenParams;
  PostDetailScreen: PostDetailScreenParams;
  Comments: CommentScreenParams;
};

export type StackScreenFC<RouteNameT extends keyof RootStackParamList = keyof RootStackParamList, PropsT = {}> = FC<
  PropsT & {
    route: RouteProp<RootStackParamList, RouteNameT>;
    navigation: StackNavigationProp<RootStackParamList, RouteNameT>;
  }
>;
