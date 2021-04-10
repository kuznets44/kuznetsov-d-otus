import rootReducer from './reducers';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

export const store = createStore(
  rootReducer, 
  devToolsEnhancer({})
);

