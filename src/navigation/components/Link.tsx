import React from 'react';
import LinkBase, { LinkBaseProps } from './LinkBase';
import { RouteName, Params } from 'navigation/types/RouteName';

export interface LinkProps<RouteNameT extends RouteName> extends Omit<LinkBaseProps, 'to' | 'push' | 'params'> {
  to?: RouteNameT | '../';
  push?: RouteNameT;
  params?: Params<RouteNameT>;
}

function Link<RouteNameT extends RouteName>({ ...rest }: LinkProps<RouteNameT>) {
  return <LinkBase {...rest} />;
}

export default Link;
