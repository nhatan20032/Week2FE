import { createStore } from 'redux';
import { addOrRemoveReducer } from './reducer';

const store = createStore(addOrRemoveReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
