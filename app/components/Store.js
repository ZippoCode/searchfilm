import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';

// Importing reducers
import { authentication } from '../containers/SignIn/authentication.reducer';
import { favorites } from '../containers/DetailsMovie/favorite.reducer';
import { voted } from '../containers/DetailsMovie/voted.reducer';

const rootReducer = combineReducers({
    authentication,
    favorites,
    voted,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
