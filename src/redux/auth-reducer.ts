import {tcarActionType} from "./store";

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

export const authReducer = (state:initialStateType = initialState, action: ActiosType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}
export type  SetAuthUserDateType =  ReturnType<typeof setAuthUserDate>
type ActiosType =SetAuthUserDateType
export const setAuthUserDate = (userId: number, email: string, login: string) => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
}as const)


export type ResponseType = {
    resultCode: number
    messages: [],
    data: {
        id: number,
        email: string,
        login: string
    }
}