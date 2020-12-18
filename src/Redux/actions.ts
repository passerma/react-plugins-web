import { SET_LOGIN_STATE, SET_LOGIN_STATE_TYPE } from './types';

export function setLoginState(isLogin: boolean): SET_LOGIN_STATE_TYPE {
    return {
        type: SET_LOGIN_STATE,
        isLogin
    }
}