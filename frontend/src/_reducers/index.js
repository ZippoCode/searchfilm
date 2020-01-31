import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import {errorMessage as error} from './error.reduces';
//import { userMovie } from './user.reducer';
import { movie } from './movie.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    //userMovie,
    error,
    movie,
})

export default rootReducer;