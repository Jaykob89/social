import React from 'react';
import s from './ProfileInfo.module.css'


const ProfileInfo = () => {
    return <div>
        <div>
            <img src='https://autoua.net/media/uploads/raznoe/d925cffa-tesla-model3-europe-sales-sept-6.jpg'/>
        </div>
        <div className={s.descriptionBlock}>
            ava + description
        </div>
    </div>
}


export default ProfileInfo;