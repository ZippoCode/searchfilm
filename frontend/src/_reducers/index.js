import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
//import { userMovie } from './user.reducer';
import { movie } from './movie.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    //userMovie,
    movie,
})

export default rootReducer;