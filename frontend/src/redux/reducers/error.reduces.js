import { ErrorConstants as ErrorTypes } from '../constants/error.constants';

export function errorMessage(state = null, action) {
    const { type, valueError } = action;

    switch (type) {
        case (ErrorTypes.ERROR_LOGIN):
            return { error: true, errorName: valueError };
        case (ErrorTypes.ERROR_REGISTER):
            return { error: true, errorName: valueError };
        default:
            return state;
    }
}