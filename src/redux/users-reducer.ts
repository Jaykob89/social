import {postsType, tcarActionType} from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SET_USERS';


export type usersType = {
    id: number
    followed: boolean
    name: string
    photoUrl: string
    status: string
    photos: {
        "small": string | null,
        "large": string | null
    },
    location: { city: string, country: string }
}

 export type setUsersType = {
    items:usersType[]
}


//
// export type resultType = {
//     items: []
//     name: string,
//     id: number,
//     photos: {
//         "small": string | null,
//         "large": string | null
//     },
//     status: string,
//     followed: boolean
// }



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

