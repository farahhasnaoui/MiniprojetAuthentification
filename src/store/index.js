
import { combineReducers } from '@reduxjs/toolkit';

import menu from './menu';
import userReducer from './reducers/UserSlice'; 

const rootReducer = combineReducers({
  menu,
  user: userReducer, 

});

export default rootReducer;
