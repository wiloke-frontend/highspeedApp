import { ViewStyle, StyleProp } from 'react-native';

export interface AuthorInfoCardProps {
  viewTotal?: number;
  likeTotal?: number;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  shadow?: boolean;
  style?: StyleProp<ViewStyle>;
}
