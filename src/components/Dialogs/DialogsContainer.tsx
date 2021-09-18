import React, {ChangeEvent} from "react";
import {RootStateType, StoreType, tcarActionType} from "../../redux/store";
import {updateNewMessageTextAC, addMessageAC} from '../../redux/dialog-reducer'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type  propsType = {
    // store:StoreType
    // dispatch:(action:tcarActionType)=>void
    // newMessageText:string
}


let mapStateToProps = (state:RootStateType) => {
    return {
        dialogsPage:state.massagesPage,
        newMessageText:state.massagesPage.newMessageText
    }
}

let mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        updateNewMessage:(text:string)=>{
            dispatch(updateNewMessageTextAC(text))
        },
        addMessage:()=>{
            dispatch(addMessageAC())
        }
    }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;