import React from "react";
import styles from './users.module.css';
import {UsersPropsType} from "./UsersContainer";
import axios, {AxiosResponse} from "axios";
import {setUsersType} from "../../redux/users-reducer";
import userPhoto from '../../assets/images/user-profile.png'
import {RootStateType} from "../../redux/store";

class Users extends React.Component<UsersPropsType, RootStateType> {

    constructor(props: UsersPropsType) {
        super(props);
        if (this.props.usersPage.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response: AxiosResponse<setUsersType>) => {
                this.props.setUsers(response.data.items)
            });
        }
    }

    render() {
        return <div>
            {
                this.props.usersPage.users.map(u => <div key={u.id}>
                 <span>
                     <div><img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.usersPhoto}/></div>
                    <div>                         {u.followed ? <button onClick={() => {
                            this.props.unfollow(u.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            this.props.follow(u.id)
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
}


export default Users

// import React from "react";
// import styles from './users.module.css';
// import {UsersPropsType} from "./UsersContainer";
// import axios, {AxiosResponse} from "axios";
// import {setUsersType} from "../../redux/users-reducer";
// import userPhoto from '../../assets/images/user-profile.png'
//
// export let Users = (props: UsersPropsType) => {
//
//     let getUsers = () => {
//         if (props.usersPage.users.length === 0) {
//             axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response: AxiosResponse<setUsersType>) => {
//                 props.setUsers(response.data.items)
//             });
//         }
//     }
//     return <div>
//         <button onClick={getUsers}>Get Users</button>
//         {
//             props.usersPage.users.map(u => <div key={u.id}>
//                 <span>
//                     <div>
//                         <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.usersPhoto}/>
//                     </div>
//                     <div>
//                         {u.followed ? <button onClick={() => {
//                                 props.unfollow(u.id)
//                             }}>Unfollow</button>
//                             : <button onClick={() => {
//                                 props.follow(u.id)
//                             }}>Follow</button>}
//                     </div>
//                 </span>
//                 <span>
//                     <span>
//                         <div>{u.name}</div><div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{'u.location.city'}</div>
//                         <div>{'u.location.country'}</div>
//
//                     </span>
//
//                 </span>
//             </div>)
//         }
//     </div>
// }