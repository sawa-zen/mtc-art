import { put, takeEvery } from 'redux-saga/effects';
import { RESET_GAME } from './appAction';
import { resetPlayer } from '../gameLayer/player/playerAction';
import { resetMeteors } from '../gameLayer/meteorEmitter/meteorEmitterAction';
import { resetTime } from '../hudLayer/timer/timerAction';

function* runResetGame() {
  yield put(resetPlayer());
  yield put(resetMeteors());
  yield put(resetTime());
}

export default function* appSaga() {
  yield takeEvery(RESET_GAME, runResetGame);
}
