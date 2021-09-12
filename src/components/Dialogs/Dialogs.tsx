import React, {ChangeEvent} from "react";
import {NavLink} from "react-router-dom";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {RootStateType, tcarActionType} from "../../redux/store";
import {updateNewMessageTextAC,addMessageAC} from '../../redux/dialog-reducer'

type  propsType = {
    state:RootStateType
    dispatch:(action:tcarActionType)=>void
    newMessageText:string
}
const Dialogs = (props:propsType) => {

    // let messages = [
    //     {id: 1, message: 'Hi'},
    //     {id: 2, message: 'How is your IT'},
    //     {id: 3, message: 'Yo'},
    //     {id: 4, message: 'Yo'},
    //     {id: 5, message: 'Yo'},
    // ]

    let dialogsElements = props.state.massagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElement = props.state.massagesPage.messages.map(message => <Message message={message.message}/>)

    let addMessage = ()=> {
        props.dispatch(addMessageAC())
    }

    let newDialogElementAdd =(e:ChangeEvent<HTMLTextAreaElement>)=>{
        // props.dispatch({type:'UPDATE-NEW-MESSAGE-TEXT',messageText:e.currentTarget.value})
        props.dispatch(updateNewMessageTextAC(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

            </div>

            <div className={s.messages}>
                {messagesElement}
                <textarea onChange={newDialogElementAdd} value={props.newMessageText}/>
                <button onClick={addMessage}>Send</button>
            </div>

        </div>
    )
}

export default Dialogs;