import { rootTabNavigators, rootStackNavigators } from 'navigation/configure';

export type RootTabNavigators = typeof rootTabNavigators;
type RootStackNavigators = typeof rootStackNavigators;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type Navigators = RootStackNavigators & UnionToIntersection<RootTabNavigators[keyof RootTabNavigators]>;

export type RouteName = keyof Navigators;
export type Params<RouteNameT extends RouteName> = NonNullable<NonNullable<Navigators[RouteNameT]['defaultProps']>['navigation']>['state']['params'];
