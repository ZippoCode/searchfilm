import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
//import { userMovie } from './user.reducer';
import { moviesList } from './movie.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    //userMovie,
    moviesList,
})

export default rootReducer;