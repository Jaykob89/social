import React from "react";

let rerenderEntireTree = (state:RootStateType) => {
    console.log("test")
}

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
    newPostText:string
}
export type  massagesPageType = {
    dialogs: Array<dialogsType>
    messages: messageType[]
    newMessageText:string
}
type SidebarType = {}

export type RootStateType = {
    massagesPage: massagesPageType
    profilePage: profilePageType
    sidebar: SidebarType
}


export let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are You', likesCount: 125},
            {id: 2, message: "It's my first post", likesCount: 23},
        ],
        newPostText:""
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
        newMessageText:''
    },
    sidebar: {}
}

export let addPost = () => {
    let newPost: postsType = {
        id: 5,
        message:state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = '';
    rerenderEntireTree(state)
}

export let addMessage = ()=> {
    let newMessage: messageType = {
        id:6,
        message:state.massagesPage.newMessageText
    }
    state.massagesPage.messages.push(newMessage)
    state.massagesPage.newMessageText=''
    rerenderEntireTree(state)
}

export const changeNewMessageText = (messageText:string)=> {
    state.massagesPage.newMessageText = messageText;
    rerenderEntireTree(state)
}


export const changeNewText = (newText:string)=>{
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state)
}
export const subscribe=(observer:(state:RootStateType)=>void)=>{
    rerenderEntireTree = observer
}