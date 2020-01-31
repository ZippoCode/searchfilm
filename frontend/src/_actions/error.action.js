import { ErrorConstants as TypeError } from '../_constants/error.constants';

export function errorLogin(valueError) {
    return { type: TypeError.ERROR_LOGIN, valueError };
}

export function errorRegister(valueError) {
    return { type: TypeError.ERROR_REGISTER, valueError };
}