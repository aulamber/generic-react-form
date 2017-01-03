// import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appReducer(
  state = initialState,
  action
) {
  switch (action.type) {

    // case types.SET_ACCOUNT_PROPERTY: {
    //   return { ...state, [action.key]: action.value };
    // }

    default:
      return state;
  }
}
