import React from 'react';
import Header from "./Header";
import axios, {AxiosResponse} from "axios";
import {connect} from "react-redux";
import {setAuthUserDate} from "../../redux/auth-reducer";
import {RootStateType} from "../../redux/store";
import {AppStateType} from "../../redux/redux-store";


type ResponseType = {
    resultCode: number
    messages: [],
    data: {
        id: number,
        email: string,
        login: string
    }
}

type setAuthType = {
    setAuthUserDate: (id:number,email:string,login:string)=>void
}

type PropsType = ResponseType & setAuthType & mapStateToPropsType

class HeaderContainer extends React.Component<PropsType, RootStateType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then((response: AxiosResponse<ResponseType>) => {
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
    login:string
}

const mapStateToProps = (state: AppStateType):mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login:state.auth.login,
})

export default connect(mapStateToProps, {setAuthUserDate})(HeaderContainer);
