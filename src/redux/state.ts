import React from "react";

type messageType = {
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
}
export type  massagesPageType = {
    dialogs: Array<dialogsType>
    messages: messageType[]
    newMessageText: string
}
type SidebarType = {}
export type RootStateType = {
    massagesPage: massagesPageType
    profilePage: profilePageType
    sidebar: SidebarType
}

export type StoreType = {
    _state: RootStateType
    // addPost: (postText: string) => void
    // changeNewText: (newText: string) => void
    // addMessage: (messageText: string) => void
    // changeNewMessageText: (newMessageText: string) => void
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: tcarActionType) => void
}


export type tcarActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof addMessageAC>


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

export let addMessageAC = () => {
    return {
        type: "ADD-MESSAGE"
    } as const
}

export let updateNewMessageTextAC = (messageText: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        messageText
    } as const
}


let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are You', likesCount: 125},
                {id: 2, message: "It's my first post", likesCount: 23},
            ],
            newPostText: ""
        },
        massagesPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Victor'},
                {id: 6, name: 'Valera'},
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your IT'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
            ],
            newMessageText: ''
        },
        sidebar: {}
    },

    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("state changed")
    },
    // addPost() {
    //     let newPost: postsType = {
    //         id: 5,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     };
    //     this._state.profilePage.posts.push(newPost)
    //     this._state.profilePage.newPostText = '';
    //     this._callSubscriber()
    // },
    // changeNewText(newText: string) {
    //     this._state.profilePage.newPostText = newText;
    //     this._callSubscriber()
    // },
    //
    // addMessage() {
    //     let newMessage: messageType = {
    //         id: 6,
    //         message: this._state.massagesPage.newMessageText
    //     }
    //     this._state.massagesPage.messages.push(newMessage)
    //     this._state.massagesPage.newMessageText = ''
    //     this._callSubscriber()
    // },
    // changeNewMessageText(messageText: string) {
    //     this._state.massagesPage.newMessageText = messageText;
    //     this._callSubscriber()
    // },

    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) { // {type: 'ADD-POST'}
        if (action.type === 'ADD-POST') {
            let newPost: postsType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = '';
            this._callSubscriber()
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber()
        } else if (action.type === 'ADD-MESSAGE') {
            let newMessage: messageType = {
                id: 6,
                message: this._state.massagesPage.newMessageText
            }
            this._state.massagesPage.messages.push(newMessage)
            this._state.massagesPage.newMessageText = ''
            this._callSubscriber()
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.massagesPage.newMessageText = action.messageText;
            this._callSubscriber()
        }
    }

}


// let rerenderEntireTree = (state:RootStateType) => {
//     console.log("test")
// }


// export let state: RootStateType = {
//     profilePage: {
//         posts: [
//             {id: 1, message: 'Hi, how are You', likesCount: 125},
//             {id: 2, message: "It's my first post", likesCount: 23},
//         ],
//         newPostText:""
//     },
//     massagesPage: {
//         dialogs: [
//             {id: 1, name: 'Dimych'},
//             {id: 2, name: 'Andrew'},
//             {id: 3, name: 'Sveta'},
//             {id: 4, name: 'Sasha'},
//             {id: 5, name: 'Victor'},
//             {id: 6, name: 'Valera'},
//         ],
//         messages: [
//             {id: 1, message: 'Hi'},
//             {id: 2, message: 'How is your IT'},
//             {id: 3, message: 'Yo'},
//             {id: 4, message: 'Yo'},
//             {id: 5, message: 'Yo'},
//         ],
//         newMessageText:''
//     },
//     sidebar: {}
// }

// export let addPost = () => {
//     let newPost: postsType = {
//         id: 5,
//         message:state.profilePage.newPostText,
//         likesCount: 0
//     };
//     state.profilePage.posts.push(newPost)
//     state.profilePage.newPostText = '';
//     rerenderEntireTree(state)
// }

// export let addMessage = ()=> {
//     let newMessage: messageType = {
//         id:6,
//         message:state.massagesPage.newMessageText
//     }
//     state.massagesPage.messages.push(newMessage)
//     state.massagesPage.newMessageText=''
//     rerenderEntireTree(state)
// }

// export const changeNewMessageText = (messageText:string)=> {
//     state.massagesPage.newMessageText = messageText;
//     rerenderEntireTree(state)
// }

// export const changeNewText = (newText:string)=>{
//     state.profilePage.newPostText = newText;
//     rerenderEntireTree(state)
// }

// export const subscribe=(observer:(state:RootStateType)=>void)=>{
//     rerenderEntireTree = observer
// }

export default store;
