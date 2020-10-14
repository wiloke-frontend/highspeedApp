import * as React from 'react';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
export interface Props {
  /**
   * Points for snapping of bottom sheet component. They define distance from bottom of the screen.
   * Might be number or percent (as string e.g. '20%') for points or percents of screen height from bottom.
   */
  snapPoints: (number | string)[];
  /**
   * Determines initial snap point of bottom sheet. Defaults to 0.
   */
  initialSnap: number;
  /**
   * Method for rendering scrollable content of bottom sheet.
   */
  renderContent?: () => React.ReactNode;
  /**
   * Method for rendering non-scrollable header of bottom sheet.
   */
  renderHeader?: () => React.ReactNode;
  /**
   * Defines if bottom sheet could be scrollable by gesture. Defaults to true.
   */
  enabledGestureInteraction?: boolean;
  enabledHeaderGestureInteraction?: boolean;
  enabledContentGestureInteraction?: boolean;
  /**
   * Defines if bottom sheet content responds to taps. Defaults to true.
   */
  enabledContentTapInteraction?: boolean;
  /**
   * When true, clamp bottom position to first snapPoint.
   */
  enabledBottomClamp?: boolean;
  /**
   * If false blocks snapping using snapTo method. Defaults to true.
   */
  enabledManualSnapping?: boolean;
  /**
   * Defines whether it's possible to scroll inner content of bottom sheet. Defaults to true.
   */
  enabledInnerScrolling?: boolean;
  /**
   * Reanimated node which holds position of bottom sheet, where 1 it the highest snap point and 0 is the lowest.
   */
  callbackNode?: Animated.Value<number>;
  /**
   * Reanimated node which holds position of bottom sheet;s content (in dp).
   */
  contentPosition?: Animated.Value<number>;
  /**
   * Reanimated node which holds position of bottom sheet's header (in dp).
   */
  headerPosition?: Animated.Value<number>;
  /**
   * Defines how violently sheet has to stopped while overdragging. 0 means no overdrag. Defaults to 0.
   */
  overdragResistanceFactor: number;
  /**
   * Array of Refs passed to gesture handlers for simultaneous event handling
   */
  simultaneousHandlers?: React.RefObject<any>[] | React.RefObject<any>;
  /**
   * Overrides config for spring animation
   */
  springConfig: {
    damping?: number;
    mass?: number;
    stiffness?: number;
    restSpeedThreshold?: number;
    restDisplacementThreshold?: number;
    toss?: number;
  };
  /**
   * Refs for gesture handlers used for building bottomsheet
   */
  innerGestureHandlerRefs: [React.RefObject<PanGestureHandler>, React.RefObject<PanGestureHandler>, React.RefObject<TapGestureHandler>];
  enabledImperativeSnapping?: boolean;
  onOpenStart?: () => void;
  onOpenEnd?: () => void;
  onCloseStart?: () => void;
  onCloseEnd?: () => void;
  callbackThreshold?: number;
  borderRadius?: number;
}
interface State {
  snapPoints: Animated.Value<number>[];
  init: any;
  initSnap: number;
  propsToNewIndices: {
    [key: string]: number;
  };
  heightOfContent: Animated.Value<number>;
  heightOfHeader: number;
  heightOfHeaderAnimated: Animated.Value<number>;
}
export default class BottomSheetBehavior extends React.Component<Props, State> {
  static defaultProps: {
    overdragResistanceFactor: number;
    initialSnap: number;
    enabledImperativeSnapping: boolean;
    enabledGestureInteraction: boolean;
    enabledBottomClamp: boolean;
    enabledHeaderGestureInteraction: boolean;
    enabledContentGestureInteraction: boolean;
    enabledContentTapInteraction: boolean;
    enabledInnerScrolling: boolean;
    springConfig: {};
    innerGestureHandlerRefs: React.RefObject<{}>[];
    callbackThreshold: number;
  };

  private readonly decayClock;

  private readonly panState;

  private readonly tapState;

  private readonly velocity;

  private readonly panMasterState;

  private readonly masterVelocity;

  private readonly isManuallySetValue;

  private readonly manuallySetValue;

  private readonly masterClockForOverscroll;

  private readonly preventDecaying;

  private readonly dragMasterY;

  private readonly dragY;

  private readonly translateMaster;

  private readonly panRef;

  private readonly master;

  private readonly tapRef;

  private readonly snapPoint;

  private readonly Y;

  private readonly clampingValue;

  private readonly onOpenStartValue;

  private readonly onOpenEndValue;

  private readonly onCloseStartValue;

  private readonly onCloseEndValue;

  snapTo: (index: number) => void;

  static renumber: (str: string) => number;

  private readonly runSpring;

  private readonly handleMasterPan;

  private readonly handlePan;

  private readonly handleTap;

  private readonly withEnhancedLimits;

  private readonly height;

  private readonly handleLayoutHeader;

  private readonly handleFullHeader;

  private readonly handleLayoutContent;
  constructor(props: Props);
  static getDerivedStateFromProps(props: Props, state: State | undefined): State;
  componentDidUpdate(_prevProps: Props, prevState: State): void;
  render(): JSX.Element;
}
export {};
