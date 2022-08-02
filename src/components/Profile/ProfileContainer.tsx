import React from 'react';
import Profile, {profileType} from "./Profile";
import {connect} from "react-redux";
import {getStatusTC, getUserProfile, savePhoto, saveProfile, updateStatusTC} from "../../redux/profile-reducer";
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
    profile: profileType
    isAuth: boolean
    status: string
    authUserId: string
}
type mapDispatchPropsType = {
    ProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => void

}

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.ProfileTC(userId)
        this.props.getStatusTC(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile()
    }


    render() {

        return <div>
            <Profile
                isOwner={!this.props.match.params.userId}
                {...this.props}
                status={this.props.status}
                updateStatus={this.props.updateStatusTC}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
            />

        </div>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {ProfileTC: getUserProfile, getStatusTC, updateStatusTC, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
