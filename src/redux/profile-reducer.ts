import {postsType, allACTypes, StoreType} from "./store";
import {profileType} from "../components/Profile/Profile";
import {stopSubmit} from "redux-form";
import {photosType} from "../types/types";
import {profileAPI} from "../api/profile-API";
import {ThunkType} from "./users-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";


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

export const getUserProfile = (userId: number | null) => async (dispatch:Dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatusTC = (userId: number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))

}

export const updateStatusTC = (status: string):ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: string):ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: profileType)=> async (dispatch: ThunkDispatch<StoreType,unknown,allACTypes>,getState:AppStateType) => {
// export const saveProfile = (profile: profileType)=> async (dispatch:Dispatch,getState:AppStateType) => {
    const userId = getState.auth.userId
        if (userId) {
            let data = await profileAPI.saveProfile(profile)
            if (data.resultCode === 0) {
                await dispatch(getUserProfile(userId))
                dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
                return Promise.reject(data.messages[0])
            }
        }
}

