import {messageType, allACTypes} from "./store";


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
}

export const dialogReducer = (state = initialState, action: allACTypes) => {

    switch (action.type) {
        case 'ADD-MESSAGE': {
            let newMessage: messageType = {
                id: 6,
                message: action.newDialogElementAdd
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        default:
            return state
    }
}

export let addMessageAC = (newDialogElementAdd: string) => {
    return {
        type: "ADD-MESSAGE",
        newDialogElementAdd,
    } as const
}


