import { NavigationScreenProp, NavigationParams, NavigationNavigateAction, NavigationAction } from 'react-navigation';
import { RouteName } from 'types/RouteName';

export type NavigationScreenPropType<TParams = {}> = Omit<NavigationScreenProp<{}, TParams>, 'navigate' | 'state'> & {
  state: { params: TParams };
  navigate(options: {
    routeName:
      | RouteName
      | {
          routeName: RouteName;
          params?: NavigationParams;
          action?: NavigationNavigateAction;
          key?: string;
        };
    params?: NavigationParams;
    action?: NavigationAction;
    key?: string;
  }): boolean;
  navigate(routeNameOrOptions: RouteName, params?: NavigationParams, action?: NavigationAction): boolean;
};
