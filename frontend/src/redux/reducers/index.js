import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { main } from './main.reducer';
import { movie } from './movie.reducer';

const rootReducer = combineReducers({
    main,
    authentication,
    registration,
    movie,
});

export default rootReducer;