import React from 'react';
import { registerRootComponent, Logs } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

if (__DEV__) {
  const isRemoteDebuggingEnabled = typeof atob !== 'undefined';
  if (isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  } else {
    Logs.enableExpoCliLogging();
  }
  activateKeepAwake();
  const AppEntry = () => {
    const App = require('./src/App').default;
    return <App />;
  };
  console.disableYellowBox = true;
  registerRootComponent(AppEntry);
} else {
  const App = require('./src/App').default;
  registerRootComponent(App);
}
