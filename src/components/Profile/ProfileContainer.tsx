import React from 'react';
import Profile, {profileType} from "./Profile";
import {connect} from "react-redux";
import {ProfileTC} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<pathParamTypes> & OwnPropsType

type pathParamTypes = {
    userId: string
}

type mapStatePropsType = {
    profile: profileType | null
    isAuth: boolean
}
type mapDispatchPropsType = {
    ProfileTC: (userId: string) => void
}

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {

        this.props.ProfileTC(this.props.match.params.userId)
    }

    render() {

        if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return <div>
            <Profile {...this.props}/>
        </div>
    }
}

let mapStateToProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {ProfileTC})(withUrlDataContainerComponent)