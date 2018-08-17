import { combineReducers } from 'redux';
import meteorEmitterReducer from './gameLayer/meteorEmitter/meteorEmitterReducer';
import playerReducer from './gameLayer/player/playerReducer';
import timerReducer from './hudLayer/timer/timerReducer';

const reducers = combineReducers({
  meteorEmitter: meteorEmitterReducer,
  player: playerReducer,
  timer: timerReducer,
});

export default reducers;
