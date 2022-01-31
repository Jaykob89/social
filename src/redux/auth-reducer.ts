import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {allACTypes, StoreType} from "./store";
import {FormAction, stopSubmit} from "redux-form";
import {AxiosResponse} from "axios";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

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
    return async (dispatch: Dispatch) => {
        let response: AxiosResponse<ResponseType> = await authApi.me()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserDate(id, email, login, true))
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<StoreType, unknown, allACTypes | FormAction>) => {
    let response: AxiosResponse<any> = await authApi.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        await dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const logout = () => {
    return async (dispatch: ThunkDispatch<StoreType, unknown, allACTypes>) => {
        let response: AxiosResponse<ResponseType> = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDate(null, null, null, false))
        }
    }
}