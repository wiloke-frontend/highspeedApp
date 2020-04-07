import { PureComponent, ReactNode } from 'react';

interface NavigationSuspenseProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface NavigationSuspenseState {
  isLoaded: boolean;
}

type DefaultProps = Pick<NavigationSuspenseProps, 'fallback'>;

export default class NavigationSuspense extends PureComponent<
  NavigationSuspenseProps,
  NavigationSuspenseState
> {
  static defaultProps: DefaultProps = {
    fallback: null,
  };

  _req!: number;

  constructor(props: NavigationSuspenseProps) {
    super(props);
    this.state = {
      isLoaded: false,
    };
    this._req = requestAnimationFrame(this._handleLoaded);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._req);
  }

  _handleLoaded = () => {
    this.setState({
      isLoaded: true,
    });
  };

  render() {
    const { children, fallback } = this.props;
    const { isLoaded } = this.state;
    return isLoaded ? children : fallback;
  }
}
