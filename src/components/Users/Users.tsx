import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user-profile.png";
import {usersType} from "../../redux/users-reducer";
import {NavLink} from 'react-router-dom';
import axios from "axios";

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
                     <div>
                         <NavLink to={'/profile/' + u.id}>
                         <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.usersPhoto}/>
                             </NavLink>
                     </div>
                    <div> {u.followed ?
                        <button onClick={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                withCredentials: true,
                                headers:{
                                    "API-KEY":"0c14d68f-3ce5-4b41-9c9a-1254c8255029"
                                }
                            })
                                .then((response: any) => {
                                    if (response.data.resultCode === 0) {
                                        props.unfollow(u.id)
                                    }
                                })

                        }}>Unfollow</button>
                        : <button onClick={() => {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                withCredentials: true,
                                headers:{
                                    "API-KEY":"0c14d68f-3ce5-4b41-9c9a-1254c8255029"
                                }
                            })
                                .then((response: any) => {
                                    if (response.data.resultCode === 0) {
                                        props.follow(u.id);
                                    }
                                })


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