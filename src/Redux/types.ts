export const SET_LOGIN_STATE = "SET_LOGIN_STATE";
export type SET_LOGIN_STATE = typeof SET_LOGIN_STATE;

// action类型
export interface SET_LOGIN_STATE_TYPE {
    type: SET_LOGIN_STATE;
    isLogin: boolean;
}