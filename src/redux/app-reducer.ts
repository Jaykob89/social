import {getAuthUserData} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {allACTypes, StoreType} from "./store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type initialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false,
}

export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
export type  initializedSuccessType = ReturnType<typeof initializedSuccess>

type ActionsType = initializedSuccessType

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
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

export const initializedApp = () => {
    return (dispatch: ThunkDispatch<StoreType, unknown, any>) => {
        let promise = dispatch(getAuthUserData())
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })

    }
}
