import React from 'react';
import Header from "./Header";
import axios, {AxiosResponse} from "axios";
import {connect} from "react-redux";
import {setAuthUserDate} from "../../redux/auth-reducer";
import {RootStateType} from "../../redux/store";
import {AppStateType} from "../../redux/redux-store";



type setAuthType = {
    setAuthUserDate: (id:number,email:string,login:string)=>void
}

type PropsType = setAuthType & mapStateToPropsType

class HeaderContainer extends React.Component<PropsType, RootStateType> {
    componentDidMount() {
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id,login,email} = response.data.data
                    this.props.setAuthUserDate(id,email,login)
                }
            });
    }

    render() {
        return <Header {...this.props}/>
    }
}
type mapStateToPropsType = {
    isAuth:boolean
    login: string | null
}

const mapStateToProps = (state: AppStateType):mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login:state.auth.login,
})

export default connect(mapStateToProps, {setAuthUserDate})(HeaderContainer);
