import React from "react";
import {addMessageAC} from '../../redux/dialog-reducer'
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.massagesPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addMessage: (newDialogElementAdd: string) => {
            dispatch(addMessageAC(newDialogElementAdd))
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);