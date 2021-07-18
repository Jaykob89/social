import React from 'react';
import s from './Profile.module.css'
const Profile = () => {
    return  <div className= {s.content}>
        <div>
            <img src ='https://autoua.net/media/uploads/raznoe/d925cffa-tesla-model3-europe-sales-sept-6.jpg' />
        </div>
        <div>
            ava + description
        </div>
        <div>
            My posts
            <div>
                New Posts
            </div>
            <div className = {s.posts}>
                <div className ={s.item}>
                    Post 1
                </div>
                <div className = {s.item}>
                    Post 2
                </div>
            </div>
        </div>
    </div>
}


export default Profile;