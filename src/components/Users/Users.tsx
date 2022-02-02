import React from "react";
import {usersType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import {User} from "./User";

type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: usersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

export let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}: propsType) => {

    return <div>
        <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        <div>
            {
                users.map(u => <User user={u} key={u.id}
                                     followingInProgress={props.followingInProgress}
                                     unfollow={props.unfollow}
                                     follow={props.follow}/>)
            }
        </div>
    </div>;
}
