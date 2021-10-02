import {postsType, tcarActionType} from "./store";


let initialState =  {
        posts: [
            {id: 1, message: 'Hi, how are You', likesCount: 125},
            {id: 2, message: "It's my first post", likesCount: 23},
        ],
        newPostText: ""
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
        default:
            return state
    }
}

export let addPostAC = () => {
    return {
        type: "ADD-POST"
    } as const
}
export let updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText
    } as const
}