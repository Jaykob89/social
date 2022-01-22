import {postsType, allACTypes} from "./store";
import {profileType} from "../components/Profile/Profile";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const SETUSEPROFILE = "SET_USER_PROFILE";
const SETSTATUS = "SET_STATUS";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are You', likesCount: 125},
        {id: 2, message: "It's my first post", likesCount: 23},
    ],
    profile: null,
    status: ""
}

type initialStateType = {
    posts: Array<postsType>
    profile: profileType | null
    status: string
}

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
export let updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText
    } as const
}

export const ProfileTC = (userId: string) => {
    return (dispatch: Dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            });
    }
}
export const getStatusTC = (userId: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            });
    }
}

type resultType = {
    resultCode: number
    messages: string,
    data: {}
}
export const updateStatusTC = (status: string) => {
    return (dispatch: Dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                // if (response.resultCode === 0) {
                dispatch(setStatus(status))
                // }
            });
    }
}

