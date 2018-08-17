import { createStore } from 'redux';
import reducers from './reducers';
import sagas from './sagas';

const store = createStore(
  reducers,
);

export default store;
