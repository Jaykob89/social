import React from "react";
import {updateNewMessageTextAC, addMessageAC} from '../../redux/dialog-reducer'
import Dialogs, {DialogPropsType} from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.massagesPage,
        newMessageText: state.massagesPage.newMessageText,
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

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;