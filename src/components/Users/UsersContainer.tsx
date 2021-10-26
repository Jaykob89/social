import React from "react";
import {Users} from "./Users";
import {connect} from "react-redux";
import {
    follow, getUsers,
    InitialStateType,
    setCurrentPages,
    toggleIsFollowing,
    unFollow,
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RootStateType} from "../../redux/store";
import {Preloader} from "../common/preloader/Preloader";


class UsersContainerComponent extends React.Component<UsersPropsType, RootStateType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.usersPage.users}
                   follow={this.props.follow}
                   unfollow={this.props.unFollow}
                   followingInProgress={this.props.followingInProgress}
            />

        </>
    }
}

type MapStatePropsType = {
    usersPage: InitialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress
    }
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setCurrentPages: (pageNumber: number) => void
    toggleIsFollowing: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

export default connect(mapStateToProps, {
    follow, unFollow, setCurrentPages,
    toggleIsFollowing, getUsers
})(UsersContainerComponent)
