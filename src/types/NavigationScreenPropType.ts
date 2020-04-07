import { NavigationScreenProp, NavigationParams, NavigationNavigateAction, NavigationAction } from 'react-navigation';
import { RouteNameType } from 'types/routeNameType';

export type NavigationScreenPropType<TParams = {}> = Omit<NavigationScreenProp<{}, TParams>, 'navigate' | 'state'> & {
  state: { params: TParams };
  navigate(options: {
    routeName:
      | RouteNameType
      | {
          routeName: RouteNameType;
          params?: NavigationParams;
          action?: NavigationNavigateAction;
          key?: string;
        };
    params?: NavigationParams;
    action?: NavigationAction;
    key?: string;
  }): boolean;
  navigate(routeNameOrOptions: RouteNameType, params?: NavigationParams, action?: NavigationAction): boolean;
};
