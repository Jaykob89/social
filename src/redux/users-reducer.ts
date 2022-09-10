import {allACTypes} from "./store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {usersType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SET_USERS';
const SETCURRENTPAGE = 'SET_CURRENT_PAGE';
const SETTOTALUSERSCOUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLEISFETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


export type setUsersType = {
    items: usersType[]
    totalCount: number
}

let initialState: InitialStateType = {
    users: [] as usersType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export type InitialStateType = {
    users: usersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}

export const usersReducer = (state: InitialStateType = initialState, action: allACTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true};
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                // users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false};
                    }
                    return u;
                })
            }

        case SETUSERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SETCURRENTPAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SETTOTALUSERSCOUNT: {
            return {
                ...state, totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLEISFETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
}

export const followSuccess = (userId: number) => ({type: FOLLOW, userId}) as const
export const unFollowSuccess = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsers = (users: usersType[]) => ({type: SETUSERS, users}) as const
export const setCurrentPages = (currentPage: number) => ({type: SETCURRENTPAGE, currentPage}) as const
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SETTOTALUSERSCOUNT, totalUsersCount}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLEISFETCHING, isFetching}) as const
export const toggleIsFollowing = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
}) as const

export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPages(page))

    let data: setUsersType = await usersAPI.getUsers(page, pageSize)

    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
    dispatch(setCurrentPages(page))
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowing(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowing(false, userId))
}

export const follow = (uId: number) => {
    return async (dispatch: Dispatch) => {
        await followUnfollowFlow(dispatch, uId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unFollow = (uId: number) => {
    return async (dispatch: Dispatch) => {
        await followUnfollowFlow(dispatch, uId, usersAPI.unFollow.bind(usersAPI), unFollowSuccess)
    }
}
