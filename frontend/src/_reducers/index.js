import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
//import { userMovie } from './user.reducer';


const rootReducer = combineReducers({
    authentication,
    registration,
    //userMovie,
})

export default rootReducer;