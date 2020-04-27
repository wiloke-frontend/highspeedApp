import React, { FC, memo } from 'react';
import { StatusBar as RNStatusBar, StatusBarProps } from 'react-native';
import { useSelector } from 'react-redux';
import { nightModeSelector } from 'containers/ProfileScreen/selectors';
import { useTheme } from 'shared';

const StatusBar: FC<StatusBarProps> = ({ barStyle, backgroundColor, ...rest }) => {
  const nightMode = useSelector(nightModeSelector);
  const { colors } = useTheme();

  return (
    <RNStatusBar
      {...rest}
      backgroundColor={!!backgroundColor ? backgroundColor : colors.light}
      barStyle={!!barStyle ? barStyle : nightMode ? 'light-content' : 'dark-content'}
    />
  );
};

export default memo(StatusBar);
