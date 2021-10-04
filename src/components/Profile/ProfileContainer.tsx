import React from 'react';
import {profilePageType, RootStateType} from "../../redux/store";
import Profile from "./Profile";
import axios, {AxiosResponse} from "axios";
import {setUsersType} from "../../redux/users-reducer";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";

type propsType = {
    // profilePage:profilePageType
    // newText:string
    // dispatch:(action:tcarActionType)=>void
    // store:StoreType
}

class ProfileContainer extends React.Component<any, any>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then((response: AxiosResponse<setUsersType>) => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return <div>
            <Profile {...this.props} profile={this.props.profile} />
        </div>
    }
}

let mapStateToProps = (state:RootStateType)=>({
        profile:state.profilePage.profile
})

export default connect(mapStateToProps,{setUserProfile}) (ProfileContainer)