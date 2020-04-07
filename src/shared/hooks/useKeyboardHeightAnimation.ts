import { useState } from 'react';
import { Keyboard, KeyboardEvent, LayoutAnimation, KeyboardEventName } from 'react-native';
import { useUnmount } from './useUnmount';
import isIOS from 'shared/utils/isIOS';

function configureLayoutAnimation(event: KeyboardEvent) {
  return LayoutAnimation.configureNext({
    duration: isIOS ? event.duration : 300,
    create: {
      type: isIOS ? LayoutAnimation.Types.keyboard : LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: isIOS ? LayoutAnimation.Types.keyboard : LayoutAnimation.Types.easeInEaseOut,
    },
  });
}

export function useKeyboardHeightAnimation() {
  const [keyboardHeight, setKeyBoardHeight] = useState(0);

  const switchEventNameShow: KeyboardEventName = isIOS ? 'keyboardWillShow' : 'keyboardDidShow';
  const switchEventNameHide: KeyboardEventName = isIOS ? 'keyboardWillHide' : 'keyboardDidHide';

  const handleKeyboardShow = Keyboard.addListener(switchEventNameShow, event => {
    const keyboardHeight = isIOS ? event.endCoordinates.height : event.endCoordinates.height - 100;
    configureLayoutAnimation(event);
    setKeyBoardHeight(keyboardHeight);
  });

  const handleKeyboardHide = Keyboard.addListener(switchEventNameHide, event => {
    configureLayoutAnimation(event);
    setKeyBoardHeight(0);
  });

  useUnmount(() => {
    handleKeyboardShow.remove();
    handleKeyboardHide.remove();
  });

  return keyboardHeight;
}
