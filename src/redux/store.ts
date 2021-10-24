import React from "react";
import {addPostAC, setUserProfile, updateNewPostTextAC} from "./profile-reducer";
import {addMessageAC, updateNewMessageTextAC} from "./dialog-reducer";
import {
    followSuccess,
    setCurrentPages,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowing,
    unFollowSuccess
} from "./users-reducer";
import {profileType} from "../components/Profile/Profile";
import {setAuthUserDate} from "./auth-reducer";

export type messageType = {
    id: number
    message: string
}
type dialogsType = {
    id: number
    name: string
}
export type postsType = {
    id: number
    message: string
    likesCount: number
}

export type profilePageType = {
    posts: postsType[]
    newPostText: string
    profile: profileType | null
}
export type  massagesPageType = {
    dialogs: Array<dialogsType>
    messages: messageType[]
    newMessageText: string
}
export type SidebarType = {}
export type RootStateType = {
    massagesPage: massagesPageType
    profilePage: profilePageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: allACTypes) => void
}

export type allACTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPages>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserDate>
    | ReturnType<typeof toggleIsFollowing>

