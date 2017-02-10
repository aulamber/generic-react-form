import { combineReducers } from 'redux';

import appReducer from './appReducer';
// import formReducer from '../form/reducer/index';

const rootReducer = combineReducers({
  appReducer,
  // formReducer,
});

export default rootReducer;
