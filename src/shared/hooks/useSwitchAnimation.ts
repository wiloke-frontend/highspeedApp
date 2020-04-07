import { useRef } from 'react';
import { ViewStyle } from 'react-native';
import { useMeasure, MeasureType } from 'shared/hooks/useMeasure';
import { useToggle } from 'shared/hooks/useToggle';
import sleep from 'shared/utils/sleep';

export type PlacementType =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom';

interface UseToggleAnimation {
  placement: PlacementType;
  duration?: number;
}

function getInlineStyle(
  placement: PlacementType,
  buttonMeasure: MeasureType,
  contentMeasure: MeasureType,
): Pick<ViewStyle, 'top' | 'left'> {
  const top = buttonMeasure.pageY - contentMeasure.height;
  const bottom = buttonMeasure.pageY + buttonMeasure.height;
  const leftInner = buttonMeasure.pageX;
  const rightInner = buttonMeasure.pageX - contentMeasure.width + buttonMeasure.width;
  const leftOuter = buttonMeasure.pageX - contentMeasure.width;
  const rightOuter = contentMeasure.width + buttonMeasure.width;
  const center = buttonMeasure.pageX - (contentMeasure.width - buttonMeasure.width) / 2;
  const middle = buttonMeasure.pageY - (contentMeasure.height - buttonMeasure.height) / 2;
  switch (placement) {
    case 'topLeft':
      return {
        top,
        left: leftInner,
      };
    case 'topRight':
      return {
        top,
        left: rightInner,
      };
    case 'rightTop':
      return {
        top,
        left: rightOuter,
      };
    case 'right':
      return {
        top: middle,
        left: rightOuter,
      };
    case 'rightBottom':
      return {
        top: bottom,
        left: rightOuter,
      };
    case 'bottomLeft':
      return {
        top: bottom,
        left: leftInner,
      };
    case 'bottom':
      return {
        top: bottom,
        left: center,
      };
    case 'bottomRight':
      return {
        top: bottom,
        left: rightInner,
      };
    case 'leftTop':
      return {
        top,
        left: leftOuter,
      };
    case 'left':
      return {
        top: middle,
        left: leftOuter,
      };
    case 'leftBottom':
      return {
        top: bottom,
        left: leftOuter,
      };
    case 'top':
    default:
      return {
        top,
        left: center,
      };
  }
}

export function useSwitchAnimation({ placement, duration = 0 }: UseToggleAnimation) {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, onVisible] = useToggle(false);
  const [isAnimation, onAnim] = useToggle(false);
  const [buttonMeasure, onButtonMeasure] = useMeasure(buttonRef);
  const [contentMeasure, onContentMeasure] = useMeasure(contentRef);
  const contentStyle = getInlineStyle(placement, buttonMeasure, contentMeasure);

  const onOpen = async () => {
    onButtonMeasure();
    onContentMeasure();
    onVisible();
    await sleep(100);
    onAnim();
  };

  const onClose = async () => {
    onAnim();
    await sleep(duration);
    onVisible();
  };

  return { buttonRef, contentRef, contentStyle, isVisible, isAnimation, onOpen, onClose };
}
