import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {massagesPageType} from "../../redux/store";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

export type NewMessageFormDataType = {
    newDialogElementAdd: string
}

export type DialogPropsType = {
    dialogsPage: massagesPageType
    newMessageText: string
    updateNewMessage: (text: string) => void
    addMessage: (values: string) => void
    isAuth: boolean
}


const Dialogs: React.FC<DialogPropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElement = state.messages.map(message => <Message message={message.message}/>)

    let OnAddMessage = (values: NewMessageFormDataType) => {
        props.addMessage(values.newDialogElementAdd);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

            </div>

            <div className={s.messages}>
                {messagesElement}

            </div>
            <AddMessageFormRedux onSubmit={OnAddMessage}/>
        </div>
    )
}

export default Dialogs;