import { fork } from 'redux-saga/effects';
import appSaga from './app/appSaga';
import gameLayerSaga from './gameLayer/gameLayerSaga';

export default function* rootSaga() {
  yield fork(appSaga);
  yield fork(gameLayerSaga);
}
