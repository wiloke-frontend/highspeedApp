import { PureComponent } from 'react';
import { NavigationStackScreenProps, NavigationStackOptions, NavigationStackProp } from 'react-navigation-stack';
import { NavigationScreenConfig, NavigationRoute } from 'react-navigation';
import { NavigationScreenPropType } from 'types/NavigationScreenPropType';

interface NavigationScreenPropCustomType<TParams> {
  navigation: NavigationScreenPropType<TParams>;
}

export default abstract class StackComponent<TProps = {}, TState = {}, TParams = {}, TScreenProps = unknown> extends PureComponent<
  TProps & NavigationStackScreenProps<TParams, TScreenProps> & NavigationScreenPropCustomType<TParams>,
  TState
> {
  static navigationOptions?: NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>>;
}
