import React from "react";
import {updateNewMessageTextAC, addMessageAC} from '../../redux/dialog-reducer'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
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

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);