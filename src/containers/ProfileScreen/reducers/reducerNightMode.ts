import { ActionTypes, createReducer, handleAction } from 'utils/functions/reduxActions';
import { changeNightMode } from '../actions/actionNightMode';

type NightModeAction = ActionTypes<typeof changeNightMode>;
type NightModeState = boolean;

export const nightMode = createReducer<NightModeState, NightModeAction>(false, [handleAction('@changeNightMode', state => !state)]);
