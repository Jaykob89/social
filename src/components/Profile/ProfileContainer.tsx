import React from 'react';
import {RootStateType} from "../../redux/store";
import Profile, {profileType} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<pathParamTypes> & OwnPropsType

type pathParamTypes = {
    userId:string
}

type mapStatePropsType = {
    profile: profileType | null
}
type mapDispatchPropsType = {
    setUserProfile: (profile: profileType) => void
}

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "2";
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return <div>
            <Profile {...this.props}/>
        </div>
    }
}

let mapStateToProps = (state: RootStateType):mapStatePropsType => ({
    profile: state.profilePage.profile
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(withUrlDataContainerComponent)