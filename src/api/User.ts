export interface UserProfile {
  id: number;
  displayName: string;
  avatar: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
