import {ResultCodeEnum, ResultCodeForCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";
import {AxiosResponse} from "axios";
import {authApi} from "../api/auth-Api";
import {securityApi} from "../api/security-Api";
import {ThunkType} from "./users-reducer";

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

export type  SetAuthUserDateType = ReturnType<typeof setAuthUserDate>
export type  getCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>
type ActionsType = SetAuthUserDateType | getCaptchaUrlSuccessType


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null
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

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let meData = await authApi.me()
        if (meData.resultCode === ResultCodeEnum.Success) {
            let {id, login, email} = meData.data
            dispatch(setAuthUserDate(id, email, login, true))
        }
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    // let data = await authApi.login(email, password, rememberMe, captcha)
    let data = await authApi.login(email, password, rememberMe, captcha)
    if (data.data.resultCode === ResultCodeEnum.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }

        let message = data.data.messages.length > 0 ? data.data.messages[0] : 'Some Error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityApi.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response: AxiosResponse<ResponseType> = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDate(null, null, null, false))
        }
    }
}