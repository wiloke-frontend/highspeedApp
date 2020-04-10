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

type NavigationStackScreenProps<TParams = NavigationParams, TScreenProps = unknown> = TScreenProps & {
  theme: SupportedThemes;
  navigation: NavigationStackProp<NavigationRoute, TParams>;
};
type NavigationStackScreenPropsCustom<TParams, TScreenProps> = NavigationStackScreenProps<TParams, TScreenProps> & {
  navigation: NavigationScreenPropType<TParams>;
};
type NavigationStackScreenComponent<TParams = NavigationParams, TScreenProps = unknown> = React.ComponentType<
  NavigationStackScreenPropsCustom<TParams, TScreenProps>
> & {
  navigationOptions?: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, TParams>, TScreenProps>;
};

export type StackScreenFC<TParams = {}, TProps = {}> = NavigationStackScreenComponent<TParams, TProps>;
