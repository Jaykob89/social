import {postsType, profilePageType, tcarActionType} from "./store";


const SETUSEPROFILE = "SET_USER_PROFILE";

let initialState =  {
        posts: [
            {id: 1, message: 'Hi, how are You', likesCount: 125},
            {id: 2, message: "It's my first post", likesCount: 23},
        ],
        newPostText: "",
        profile:null
    }

export const profileReducer = (state = initialState, action: tcarActionType) => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost: postsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        }
        case "UPDATE-NEW-POST-TEXT":{
            return {
                ...state,
                newPostText: action.newText
            }
    }
    case SETUSEPROFILE:{
            return {
                ...state,
                profile: action.profile
            }
    }
        default:
            return state
    }
}

export let addPostAC = () => {
    return {
        type: "ADD-POST"
    } as const
}
export let setUserProfile = (profile:any) => {
    return {
        type: SETUSEPROFILE,
        profile
    } as const
}
export let updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText
    } as const
}