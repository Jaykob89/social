import React from 'react';
import Profile, {profileType} from "./Profile";
import {connect} from "react-redux";
import {ProfileTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";

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

        return <div>
            <Profile {...this.props}/>
        </div>
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile
})

let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default withAuthRedirect(connect(mapStateToProps, {ProfileTC})(withUrlDataContainerComponent))