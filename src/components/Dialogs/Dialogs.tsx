import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {massagesPageType} from "../../redux/store";
import {Redirect} from "react-router-dom";


export type DialogPropsType = {
    dialogsPage: massagesPageType
    newMessageText: string
    updateNewMessage: (text: string) => void
    addMessage: () => void
    isAuth: boolean
}
const Dialogs = (props: DialogPropsType) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElement = state.messages.map(message => <Message message={message.message}/>)

    let OnAddMessage = () => {
        props.addMessage();
    }

    let newDialogElementAdd = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessage(e.currentTarget.value)
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

            </div>

            <div className={s.messages}>
                {messagesElement}
                <textarea onChange={newDialogElementAdd} value={props.newMessageText}/>
                <button onClick={OnAddMessage}>Send</button>
            </div>

        </div>
    )
}

export default Dialogs;