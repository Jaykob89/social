import {postsType, allACTypes, StoreType} from "./store";
import {profileType} from "../components/Profile/Profile";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {AxiosResponse} from "axios";
import {stopSubmit} from "redux-form";
import {AppStateType} from "./redux-store";
import {ThunkDispatch} from "redux-thunk";
import {photosType} from "../types/types";

const SETUSEPROFILE = "SET_USER_PROFILE";
const SETSTATUS = "SET_STATUS";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are You', likesCount: 125},
        {id: 2, message: "It's my first post", likesCount: 23},
    ],
    profile: null as profileType | null,
    status: ""
}

type initialStateType = {
    posts: Array<postsType>
    profile: profileType | null
    status: string
}


// type ThunkType = BaseThunkType<allACTypes>

export const profileReducer = (state: initialStateType = initialState, action: allACTypes): initialStateType => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost: postsType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case SETSTATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case
        SETUSEPROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case
        "DELETE-POST": {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case
        "SAVE-PHOTO-SUCCESS": {
            return {
                ...state, profile: {...state.profile, photos: action.photos} as profileType
            }
        }
        default:
            return state
    }
}

export let addPostAC = (newPostText: string) => {
    return {
        type: "ADD-POST",
        newPostText,
    } as const
}
export let setUserProfile = (profile: profileType) => {
    return {
        type: SETUSEPROFILE,
        profile
    } as const
}
export let setStatus = (status: string) => {
    return {
        type: SETSTATUS,
        status
    } as const
}
export let deletePostAC = (postId: number) => {
    return {type: "DELETE-POST", postId} as const
}
export let savePhotoSuccess = (photos: photosType) => {
    return {type: "SAVE-PHOTO-SUCCESS", photos} as const
}


export let updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText
    } as const
}

export const getUserProfile = (userId: number | null) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))

}

export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response: AxiosResponse<any> = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: string) => async (dispatch: Dispatch) => {
    let response: AxiosResponse<any> = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: profileType) => async (dispatch: ThunkDispatch<StoreType,unknown,allACTypes>,getState:AppStateType) => {
    const userId = getState.auth.userId
    let response: AxiosResponse<any> = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        if (userId != null){
            await dispatch(getUserProfile(userId))
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

