import { tcarActionType} from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SETUSERS = 'SET_USERS';
const SETCURRENTPAGE = 'SET_CURRENT_PAGE';
const SETTOTALUSERSCOUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLEISFETCHING = 'TOGGLE_IS_FETCHING';

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
    items: usersType[]
    totalCount: number
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

let initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export type InitialStateType = {
    users: usersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

}

export const usersReducer = (state:InitialStateType = initialState, action: tcarActionType): InitialStateType => {
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
            return {
                ...state,
                users: [...action.users, ...state.users]
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

        default:
            return state;
    }
}

export const follow = (userId: number) => ({type: FOLLOW, userId}) as const
export const unFollow = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsers = (users: usersType[]) => ({type: SETUSERS, users}) as const
export const setCurrentPages = (currentPage: number) => ({type: SETCURRENTPAGE, currentPage}) as const
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SETTOTALUSERSCOUNT, totalUsersCount}) as const
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLEISFETCHING, isFetching}) as const

