import React, {ChangeEvent} from "react";
import {RootStateType, StoreType, tcarActionType} from "../../redux/store";
import {updateNewMessageTextAC, addMessageAC} from '../../redux/dialog-reducer'
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

type  propsType = {
    // store:StoreType
    // dispatch:(action:tcarActionType)=>void
    // newMessageText:string
}
const DialogsContainer = (props: propsType) => {



    // let messages = [
    //     {id: 1, message: 'Hi'},
    //     {id: 2, message: 'How is your IT'},
    //     {id: 3, message: 'Yo'},
    //     {id: 4, message: 'Yo'},
    //     {id: 5, message: 'Yo'},
    // ]



    return <StoreContext.Consumer>{
        (store) => {
            let state = store.getState().massagesPage

            let addMessage = () => {
               store.dispatch(addMessageAC())
            }

            let newDialogElementAdd = (text: string) => {
                // props.dispatch({type:'UPDATE-NEW-MESSAGE-TEXT',messageText:e.currentTarget.value})
                store.dispatch(updateNewMessageTextAC(text))
            }
            return <Dialogs updateNewMessage={newDialogElementAdd}
                            addMessage={addMessage} dialogsPage={state}
                            newMessageText={state.newMessageText}/>
        }
    }
    </StoreContext.Consumer>
}

export default DialogsContainer;