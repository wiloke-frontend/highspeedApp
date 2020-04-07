import { ComponentType } from 'react';

export default function getDisplayNameHOC<P extends object>(WrappedComponent: ComponentType<P>) {
  return (WrappedComponent.displayName ?? WrappedComponent.name) || 'Component';
}