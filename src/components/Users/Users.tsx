import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user-profile.png";
import {usersType} from "../../redux/users-reducer";

type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: usersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


export let Users = (props: propsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => <span className={props.currentPage === p ? styles.selectedPage : ''} onClick={(e) => {
            props.onPageChanged(p)
        }}> {p} </span>)}

        {
            props.users.map(u => <div key={u.id}>
                 <span>
                     <div><img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.usersPhoto}/></div>
                    <div>                         {u.followed ? <button onClick={() => {
                            props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>}
                    </div>
                </span>
                <span><span><div>{u.name}</div>
                        <div>{u.status}</div></span>
                    <span>
                         <div>{'u.location.city'}</div>
                         <div>{'u.location.country'}</div>
                     </span>
                 </span>
            </div>)}
    </div>;
}