import React from "react";
import {Users} from "./Users";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    follow,
    InitialStateType,
    setCurrentPages, setTotalUsersCount,
    setUsers, setUsersType, toggleIsFetching,
    unFollow,
    usersType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RootStateType} from "../../redux/store";
import axios, {AxiosResponse} from "axios";
import {Preloader} from "../common/preloader/Preloader";


class UsersContainerComponent extends React.Component<UsersPropsType, RootStateType> {
    componentDidMount() {

        this.props.toggleIsFetching(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then((response: AxiosResponse<setUsersType>) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPages(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then((response: AxiosResponse<setUsersType>) => {
                this.props.setUsers(response.data.items)
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
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersPage: state.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching

    }
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: usersType[]) => void
    setCurrentPages: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void

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
})(UsersContainerComponent)
