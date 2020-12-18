import { createStore, combineReducers } from "redux";
import { getLogin } from "./reducers";

const reducers = combineReducers({
    getLogin
});

export type reducerType = ReturnType<typeof reducers>;

export default createStore(reducers);