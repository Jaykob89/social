import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {allACTypes, StoreType} from "./store";
import {FormAction, stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean
    isAuth: boolean
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
}

export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
export type  SetAuthUserDateType = ReturnType<typeof setAuthUserDate>
type ActionsType = SetAuthUserDateType

export const setAuthUserDate = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)

export type ResponseType = {
    resultCode: number
    messages: [],
    data: {
        id: number,
        email: string,
        login: string
    }
}

export const getAuthUserData = () => {
    return (dispatch: Dispatch) => {
        authApi.me()
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    dispatch(setAuthUserDate(id, email, login, true))
                }
            });
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<StoreType, unknown, allACTypes | FormAction>) => {
        return authApi.login(email, password, rememberMe)
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }else {
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
                    dispatch(stopSubmit('login',{_error: message}))
                }
            });
}
export const logout = () => {
    return (dispatch: ThunkDispatch<StoreType, unknown, allACTypes>) => {
        authApi.logout()
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDate(null, null, null, false))
                }
            });
    }
}