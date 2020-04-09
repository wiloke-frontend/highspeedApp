import { rootTabNavigators, rootStackNavigators } from 'navigation/configure';

type T = typeof rootTabNavigators;
type P = {
  [K in keyof T]: T[K] extends {} ? keyof T[K] : K;
};
type TabNavigatorRouteName = P[keyof P];

export type RouteName = TabNavigatorRouteName | keyof typeof rootStackNavigators;
