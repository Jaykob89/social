import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {massagesPageType} from "../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    newDialogElementAdd:string
}

export type DialogPropsType = {
    dialogsPage: massagesPageType
    newMessageText: string
    updateNewMessage: (text: string) => void
    addMessage: (values:string) => void
    isAuth: boolean
}
const Dialogs = (props: DialogPropsType) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElement = state.messages.map(message => <Message message={message.message}/>)

    // let OnAddMessage = () => {
    //     props.addMessage();
    // }
    let OnAddMessage = (values:FormDataType) => {
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

const AddMessageForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newDialogElementAdd'} placeholder={'Enter your message'}/>
            </div>
                <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form:"dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;