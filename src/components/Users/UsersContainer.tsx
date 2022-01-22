import React from "react";
import {Users} from "./Users";
import {connect} from "react-redux";
import {
    follow, requestUsers,
    setCurrentPages,
    toggleIsFollowing,
    unFollow, usersType,
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RootStateType} from "../../redux/store";
import {Preloader} from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/user-selectors";

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
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unFollow}
                   followingInProgress={this.props.followingInProgress}
            />

        </>
    }
}

type MapStatePropsType = {
    users: usersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
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

connect(mapStateToProps, {
    follow, unFollow, setCurrentPages,
    toggleIsFollowing, getUsers: requestUsers
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow, unFollow, setCurrentPages,
        toggleIsFollowing, getUsers: requestUsers
    })
)(UsersContainerComponent)