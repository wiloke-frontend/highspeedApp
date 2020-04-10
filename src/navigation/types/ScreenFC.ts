import { NavigationScreenConfig, NavigationRoute, NavigationParams, SupportedThemes } from 'react-navigation';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { NavigationScreenProp } from './NavigationScreenProp';

type NavigationStackScreenProps<ParamsT = NavigationParams, ScreenPropsT = unknown> = ScreenPropsT & {
  theme: SupportedThemes;
  navigation: NavigationScreenProp<ParamsT>;
};
type NavigationStackScreenPropsCustom<ParamsT, ScreenPropsT> = NavigationStackScreenProps<ParamsT, ScreenPropsT> & {
  navigation: NavigationScreenProp<ParamsT>;
};
type NavigationStackScreenComponent<ParamsT = NavigationParams, ScreenPropsT = unknown> = React.ComponentType<
  NavigationStackScreenPropsCustom<ParamsT, ScreenPropsT>
> & {
  navigationOptions?: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, ParamsT>, ScreenPropsT>;
};

export type ScreenFC<ParamsT = {}, PropsT = {}> = NavigationStackScreenComponent<ParamsT, PropsT>;
