import React, { FC } from 'react';
import { Text, Icons, withViewStyles, tachyons } from 'shared';
import { StyleProp, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import i18n from 'utils/functions/i18n';

export interface RetryProps extends Omit<TouchableOpacityProps, 'style'> {
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TouchableOpacityWithStyles = withViewStyles(TouchableOpacity);

const Retry: FC<RetryProps> = ({ text = i18n.t('retry'), containerStyle, ...rest }) => {
  return (
    <TouchableOpacityWithStyles {...rest} style={[tachyons.itemsCenter, containerStyle]}>
      <Icons.Feather name="rotate-cw" size={20} color="dark3" />
      {!!text && (
        <Text type="small" tachyons="mt2">
          {text}
        </Text>
      )}
    </TouchableOpacityWithStyles>
  );
};

export default withViewStyles(Retry, 'containerStyle');
