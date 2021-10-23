import React from 'react';
import {RootStateType} from "../../redux/store";
import Profile, {profileType} from "./Profile";
import {connect} from "react-redux";
import {ProfileTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";


type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<pathParamTypes> & OwnPropsType

type pathParamTypes = {
    userId: string
}

type mapStatePropsType = {
    profile: profileType | null
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

let mapStateToProps = (state: RootStateType): mapStatePropsType => ({
    profile: state.profilePage.profile
})


let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {ProfileTC})(withUrlDataContainerComponent)