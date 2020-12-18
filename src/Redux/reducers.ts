import { SET_LOGIN_STATE, SET_LOGIN_STATE_TYPE } from "./types";

export function getLogin(state = false, action: SET_LOGIN_STATE_TYPE): boolean {
    switch (action.type) {
        case SET_LOGIN_STATE:
            return action.isLogin;
        default:
            return state;
    }
}