import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { errorMessage as error } from './error.reduces';
import { main } from './main.reducer';
import { movie } from './movie.reducer';
import { user } from './user.reducer';

const rootReducer = combineReducers({
    main,
    authentication,
    registration,
    error,
    movie,
    user,
});

export default rootReducer;