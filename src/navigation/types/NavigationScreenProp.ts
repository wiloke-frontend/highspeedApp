import { NavigationScreenProp as RNNavigationScreenProp, NavigationParams, NavigationNavigateAction, NavigationAction } from 'react-navigation';
import { RouteName } from 'navigation';

export type NavigationScreenProp<TParams = {}> = Omit<RNNavigationScreenProp<{}, TParams>, 'navigate' | 'state'> & {
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
