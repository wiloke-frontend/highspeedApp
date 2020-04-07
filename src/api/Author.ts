export interface SocialItem {
  link: string;
  name: string;
  icon: string;
}

export interface Author {
  id: number;
  displayName: string;
  avatar: string;
  phone?: number;
  email: string;
  username?: string;
  description?: string;
  socialNetworks?: SocialItem[];
}
