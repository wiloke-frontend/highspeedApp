import * as React from 'react';
import { Reducers } from './store/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type RootState = Reducers;
  declare type GetState = () => AppState;
  declare type Connect<TTypeOfMapStateToProps, TTypeOfMapDispatchToProps> = ReturnType<TTypeOfMapStateToProps> & TTypeOfMapDispatchToProps;

  declare type ValueOf<T> = T[keyof T];

  declare type ReducerStatus = 'loading' | 'success' | 'failure';

  declare interface ReducerState<TData = any> {
    status?: ReducerStatus;
    loadmoreStatus?: ReducerStatus;
    pageNext?: number;
    message?: string;
    data: TData;
    [key: string]: any;
  }

  declare type Timeout = NodeJS.Timeout;

  declare type IdentityFunction = <T>(fn: T) => T;
}
