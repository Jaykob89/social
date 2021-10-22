import React from "react";
import {Users} from "./Users";
import {connect} from "react-redux";
import {
    follow,
    InitialStateType,
    setCurrentPages, setTotalUsersCount,
    setUsers, toggleIsFetching, toggleIsFollowing,
    unFollow,
    usersType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RootStateType} from "../../redux/store";
import {Preloader} from "../common/preloader/Preloader";
import {usersAPI} from "../../api/api";


class UsersContainerComponent extends React.Component<UsersPropsType, RootStateType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then((data:any) => {
                debugger
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPages(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then((data:any) => {
                this.props.setUsers(data.items)
                this.props.toggleIsFetching(false)
            });
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
                   toggleIsFollowing={this.props.toggleIsFollowing}
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
    followingInProgress:Array<number>

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress:state.users.followingInProgress
    }
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: usersType[]) => void
    setCurrentPages: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowing: (isFetching: boolean,userId:number) => void
}

export type UsersPropsType = MapStatePropsType & mapDispatchToPropsType

// let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (users: usersType[]) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(setCurrentPagesAC(pageNumber))
//         },
//         setTotalUsersCount: (totalUsersCount: number) => {
//             dispatch(setTotalUsersCountAC(totalUsersCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         },
//     }
// }

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPages,
    setTotalUsersCount,
    toggleIsFetching,
    toggleIsFollowing
})(UsersContainerComponent)
