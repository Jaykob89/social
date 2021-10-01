import React from "react";
import styles from './users.module.css';
import {UsersPropsType} from "./UsersContainer";


export let Users = (props:UsersPropsType)=> {
    if (props.usersPage.users.length ===0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'http://www.xboxland.net/forum/uploads/profile/photo-82658.gif?_r=1388338488',
                followed: false,
                fullName: 'Dmitry',
                status: "I'm a Boss",
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'http://www.xboxland.net/forum/uploads/profile/photo-82658.gif?_r=1388338488',
                followed: true,
                fullName: 'Sasha',
                status: "I'm a boss too",
                location: {city: 'Los-Angeles', country: 'USA'}
            },
            {
                id: 3, photoUrl: 'http://www.xboxland.net/forum/uploads/profile/photo-82658.gif?_r=1388338488',
                followed: false, fullName: 'Andrew', status: "I'm too", location: {city: 'Kyiv', country: 'Ukraine'}
            },
        ])
    }

    return <div>
        {
            props.usersPage.users.map(u=><div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.usersPhoto}/>
                    </div>
                    <div>
                        {u.followed ? <button onClick={()=>{props.unfollow(u.id)}}>Unfollow</button>
                            : <button onClick={()=>{props.follow(u.id)}}>Follow</button> }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.city}</div>
                        <div>{u.location.country}</div>

                    </span>

                </span>
            </div>)
        }
    </div>
}