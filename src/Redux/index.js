import {combineReducers} from 'redux';
import {authReducer, usersReducer, chatReducer} from './Reducer';

const reducerz = combineReducers({
  authReducer,
  usersReducer,
  chatReducer,
});
export default reducerz;
