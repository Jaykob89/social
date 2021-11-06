import React from 'react';
import Profile, {profileType} from "./Profile";
import {connect} from "react-redux";
import {getStatusTC, ProfileTC, updateStatusTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";

type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<pathParamTypes> & OwnPropsType

type pathParamTypes = {
    userId: string
}

type mapStatePropsType = {
    profile: profileType | null
    isAuth: boolean
    status: string
}
type mapDispatchPropsType = {
    ProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
}

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.ProfileTC(this.props.match.params.userId)
        this.props.getStatusTC(this.props.match.params.userId)
    }

    render() {

        return <div>
            <Profile {...this.props} status={this.props.status} updateStatus={this.props.updateStatusTC}/>
        </div>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {ProfileTC, getStatusTC, updateStatusTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
