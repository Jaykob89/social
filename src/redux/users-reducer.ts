import {postsType, tcarActionType} from "./store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';


let initialState = {
    posts: [
        {
            id: 1,
            followed: false,
            fullName: 'Dmitry',
            status: "I'm a Boss",
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            followed: true,
            fullName: 'Sasha',
            status: "I'm a boss too",
            location: {city: 'Los-Angeles', country: 'USA'}
        },
        {id: 3, followed: false, fullName: 'Andrew', status: "I'm too", location: {city: 'Kyiv', country: 'Ukraine'}},
    ],
}

export const usersReducer = (state = initialState, action: tcarActionType) => {
    switch (action.type) {
        case FOLLOW:


        case UNFOLLOW:

        default:
            return state
    }
}

export const followAC = (userId: number) => ({type: "FOLLOW", userId})
export const unFollowAC = (userId: number) => ({type: "UNFOLLOW", userId})
