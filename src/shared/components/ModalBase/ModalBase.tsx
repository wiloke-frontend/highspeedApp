import React, { FC, ReactNode, useRef, useState, memo } from 'react';
import { View } from 'shared';
import { BackHandler, StyleProp, ViewStyle } from 'react-native';
import { useMount } from 'shared/hooks/useMount';
import isAndroid from 'shared/utils/isAndroid';
import Emitter from 'shared/utils/emitter';
import { styles } from './styles';
import { useUnmount } from 'shared/hooks/useUnmount';

export interface ModalBaseProps {
  children: ReactNode;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  onRequestClose?: () => void;
}

const Event = new Emitter();

const defaultProps = {
  visible: true,
};

export const ModalBase: FC<ModalBaseProps> = ({ onRequestClose, ...otherProps }) => {
  const backPress = useRef(0);

  Event.emit('MODAL_MOUNT', otherProps);

  const handleBackPress = () => {
    onRequestClose?.();
  };

  useMount(() => {
    backPress.current = Event.on('MODAL_BACK_PRESS', handleBackPress);
  });

  useUnmount(() => {
    Event.off(backPress.current);
  });

  return null;
};

ModalBase.defaultProps = defaultProps;

export const ModalBaseUI: FC = memo(() => {
  const mounted = useRef(0);
  const [visible, setVisible] = useState(false);
  const [children, setChildren] = useState<ReactNode>(null);
  const [style, setStyle] = useState({});

  const handleBackPress = () => {
    Event.emit('MODAL_BACK_PRESS');
  };

  const handleMount = (props: Omit<ModalBaseProps, 'onRequestClose'>) => {
    !!props.visible && setVisible(props.visible);
    setChildren(props.children);
    !!props.style && setStyle(props.style);
  };

  useMount(() => {
    if (isAndroid) {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    }
    mounted.current = Event.on('MODAL_MOUNT', handleMount);
  });

  useUnmount(() => {
    Event.off(mounted.current);
  });

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View flex style={style}>
        {children}
      </View>
    </View>
  );
});
