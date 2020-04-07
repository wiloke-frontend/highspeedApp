import { rootTabNavigators, rootStackNavigators } from 'navigation/configure';

type T = typeof rootTabNavigators;
type P = {
  [K in keyof T]: T[K] extends {} ? keyof T[K] : K;
};
type TabNavigatorRouteNameType = P[keyof P];

export type RouteNameType = TabNavigatorRouteNameType | keyof typeof rootStackNavigators;
