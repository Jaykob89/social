import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {massagesPageType, messageType, RootStateType} from "../../redux/store";


type  propsType = {
    dialogsPage:massagesPageType
    // dispatch:(action:tcarActionType)=>void
    newMessageText:string
    updateNewMessage:(text:string)=>void
    addMessage:()=>void
}
const Dialogs = (props:propsType) => {

    // let messages = [
    //     {id: 1, message: 'Hi'},
    //     {id: 2, message: 'How is your IT'},
    //     {id: 3, message: 'Yo'},
    //     {id: 4, message: 'Yo'},
    //     {id: 5, message: 'Yo'},
    // ]

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElement = state.messages.map(message => <Message message={message.message}/>)

    let OnAddMessage = ()=> {
        // props.dispatch(addMessageAC())
        props.addMessage();
    }

    let newDialogElementAdd =(e:ChangeEvent<HTMLTextAreaElement>)=>{
        // props.dispatch({type:'UPDATE-NEW-MESSAGE-TEXT',messageText:e.currentTarget.value})
        // props.dispatch(updateNewMessageTextAC(e.currentTarget.value))
        props.updateNewMessage(e.currentTarget.value)
    }

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