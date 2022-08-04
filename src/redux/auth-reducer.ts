import {Dispatch} from "redux";
import {authApi, securityApi} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {allACTypes, StoreType} from "./store";
import {FormAction, stopSubmit} from "redux-form";
import {AxiosResponse} from "axios";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean
    isAuth: boolean
    captchaUrl: string | null
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
export type  SetAuthUserDateType = ReturnType<typeof setAuthUserDate>
export type  getCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>


type ActionsType = SetAuthUserDateType | getCaptchaUrlSuccessType

export const setAuthUserDate = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
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


export const login = (email: string, password: string, rememberMe: boolean,captcha:string) => async (dispatch: ThunkDispatch<StoreType, unknown, allACTypes | FormAction>) => {
    let response: AxiosResponse<any> = await authApi.login(email, password, rememberMe,captcha)
    if (response.data.resultCode === 0) {
        await dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            await dispatch(getCaptchaUrl())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptchaUrl = () => async (dispatch: ThunkDispatch<StoreType, unknown, allACTypes>) => {
    let response: AxiosResponse<any> = await securityApi.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export const logout = () => {
    return async (dispatch: ThunkDispatch<StoreType, unknown, allACTypes>) => {
        let response: AxiosResponse<ResponseType> = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDate(null, null, null, false))
        }
    }
}