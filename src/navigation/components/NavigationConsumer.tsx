import React, { PureComponent } from 'react';
import { withNavigation, NavigationInjectedProps, NavigationParams } from 'react-navigation';

export type NavigationParamType<P = NavigationParams> = NavigationInjectedProps<P>['navigation'];

export interface NavigationConsumerProps {
  children: (navigation: NavigationParamType) => React.ReactNode;
}

class NavigationConsumer extends PureComponent<NavigationConsumerProps & NavigationInjectedProps> {
  render() {
    const { children, navigation } = this.props;
    return children(navigation);
  }
}

export default withNavigation(NavigationConsumer);
