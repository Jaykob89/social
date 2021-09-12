import {massagesPageType, messageType, tcarActionType} from "./store";


let initialState = {
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
    }

export const dialogReducer = (state=initialState, action: tcarActionType) => {

    switch (action.type) {
        case 'ADD-MESSAGE':
            let newMessage: messageType = {
                id: 6,
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = '';
            return state;

        case 'UPDATE-NEW-MESSAGE-TEXT':
            state.newMessageText = action.messageText;
            return state;
        default:
            return state
    }
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

