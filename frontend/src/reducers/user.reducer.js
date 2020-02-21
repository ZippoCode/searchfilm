import { UserActions } from '../constants/user.constants';


const initialState = {
    favorite: [],
    voted: [],
    userLoaded: false,
}

export function user(state = initialState, action) {
    switch (action.type) {
        case UserActions.USER_INFO_REQUEST:
            return Object.assign({}, state, {});
        case UserActions.USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                userLoaded: !state.userLoaded,
                first_name: action.first_name,
                last_name: action.last_name,
                date_joined: action.date_joined,
                favorite: action.favorite,
                voted: action.voted,
            });
        case UserActions.USER_INFO_FAILURE:
            return Object.assign({}, state, {
                error: true,
                errorValue: action.error,
            });
        case UserActions.SEND_PREFERITE_REQUEST:
            return Object.assign({}, state, {
                userLoaded: false,
                request: action.typeRequest
            });
        case UserActions.SEND_PREFERITE_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                userLoaded: true,
                favorite: action.favorite
            })
        case UserActions.SEND_PREFERITE_FAILURE:
            return Object.assign({}, state, {
                error: true,
                errorValue: action.error,
            }); default:
            return state;
    }
}