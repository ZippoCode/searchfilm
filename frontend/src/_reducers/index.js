import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { userAddRemoveMovie } from './user.reducer';


const rootReducer = combineReducers({
    authentication,
    registration,
    userAddRemoveMovie,
})

export default rootReducer;