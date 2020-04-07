import { NavigationScreenConfig, NavigationRoute, NavigationParams, SupportedThemes } from 'react-navigation';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { NavigationScreenPropType } from 'types/NavigationScreenPropType';

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

export type StackScreenFC<TProps = {}, TParams = {}> = NavigationStackScreenComponent<TParams, TProps>;
