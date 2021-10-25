import React from "react";
import {updateNewMessageTextAC, addMessageAC} from '../../redux/dialog-reducer'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.massagesPage,
        newMessageText: state.massagesPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessage: (text: string) => {
            dispatch(updateNewMessageTextAC(text))
        },
        addMessage: () => {
            dispatch(addMessageAC())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;