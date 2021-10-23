import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData} from "../../redux/auth-reducer";
import {RootStateType} from "../../redux/store";
import {AppStateType} from "../../redux/redux-store";

type mapDispatchType = {
    getAuthUserData: () => void
}

type PropsType = mapDispatchType & mapStateToPropsType

class HeaderContainer extends React.Component<PropsType, RootStateType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
