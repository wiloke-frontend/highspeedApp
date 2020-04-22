import { NavigationParams, NavigationNavigateAction, NavigationAction, NavigationRoute } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { RouteName } from 'navigation';

export type NavigationScreenProp<TParams = {}> = NavigationStackProp<NavigationRoute, TParams> & {
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
