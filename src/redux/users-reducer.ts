import {postsType, tcarActionType} from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SET_USERS';


export type usersType = {
    id: number
    followed: boolean
    fullName: string
    photoUrl: string
    status: string
    location: { city: string, country: string }
}

let initialState:InitialStateType = {
    users: [],
}

export type InitialStateType = {
    users:usersType[]
}

export const usersReducer = (state = initialState, action: tcarActionType): InitialStateType=> {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
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
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false};
                    }
                    return u;
                })
            }

        case SETUSERS: {
            return {...state,
                users:[...state.users, ...action.users]
            }
        }

        default:
            return state;
    }
}

export const followAC = (userId: number) => ({type: FOLLOW, userId}) as const
export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsersAC = (users: usersType[]) => ({type: SETUSERS, users}) as const

