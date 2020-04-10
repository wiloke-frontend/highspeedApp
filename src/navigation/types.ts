import { NavigationScreenConfig, NavigationRoute, NavigationParams, SupportedThemes } from 'react-navigation';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { NavigationScreenPropType } from 'types/NavigationScreenPropType';
import { rootTabNavigators, rootStackNavigators } from 'navigation/configure';

type RootTabNavigators = typeof rootTabNavigators;
type RootStackNavigators = typeof rootStackNavigators;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type Navigators = RootStackNavigators & UnionToIntersection<RootTabNavigators[keyof RootTabNavigators]>;

export type RouteName = keyof Navigators;
export type Params<RouteNameT extends RouteName> = NonNullable<NonNullable<Navigators[RouteNameT]['defaultProps']>['navigation']>['state']['params'];

type NavigationStackScreenProps<ParamsT = NavigationParams, ScreenPropsT = unknown> = ScreenPropsT & {
  theme: SupportedThemes;
  navigation: NavigationStackProp<NavigationRoute, ParamsT>;
};
type NavigationStackScreenPropsCustom<ParamsT, ScreenPropsT> = NavigationStackScreenProps<ParamsT, ScreenPropsT> & {
  navigation: NavigationScreenPropType<ParamsT>;
};
type NavigationStackScreenComponent<ParamsT = NavigationParams, ScreenPropsT = unknown> = React.ComponentType<
  NavigationStackScreenPropsCustom<ParamsT, ScreenPropsT>
> & {
  navigationOptions?: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, ParamsT>, ScreenPropsT>;
};

export type StackScreenFC<ParamsT = {}, PropsT = {}> = NavigationStackScreenComponent<ParamsT, PropsT>;
