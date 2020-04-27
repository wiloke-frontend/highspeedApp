import React, { FC, memo } from 'react';
import { StatusBar as RNStatusBar, StatusBarProps } from 'react-native';
import { useSelector } from 'react-redux';
import { nightModeSelector } from 'containers/ProfileScreen/selectors';

const StatusBar: FC<StatusBarProps> = ({ barStyle, ...rest }) => {
  const nightMode = useSelector(nightModeSelector);

  return <RNStatusBar {...rest} barStyle={barStyle ? barStyle : nightMode ? 'light-content' : 'dark-content'} />;
};

export default memo(StatusBar);
