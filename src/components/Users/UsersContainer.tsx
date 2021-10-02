import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {followAC, InitialStateType, setUsersAC, unFollowAC, usersType} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    usersPage: InitialStateType
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.users
    }
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: usersType[]) => void
}

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: usersType[]) => {
            dispatch(setUsersAC(users))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
