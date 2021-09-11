import React, {ChangeEvent} from "react";
import {NavLink} from "react-router-dom";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {RootStateType} from "../../redux/state";



type  propsType = {
    state:RootStateType
    addMessage:()=>void
    changeNewMessageText:(messageText:string)=>void
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
        props.addMessage()
    }

    let newDialogElementAdd =(e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.changeNewMessageText(e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

            </div>

            <div className={s.messages}>
                {messagesElement}
                <textarea onChange={newDialogElementAdd} value={props.newMessageText}></textarea>
                <button onClick={addMessage}>+</button>
            </div>

        </div>
    )
}

export default Dialogs;