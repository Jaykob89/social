import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profilePageType} from "../../redux/store";

type propsType  = {
    // profilePage:profilePageType
    // newText:string
    // dispatch:(action:tcarActionType)=>void
    // store:StoreType
}

const Profile = (props:any) => {

    return <div>
        <ProfileInfo profile={props.profile}/>
        <MyPostsContainer

                        // posts={props.profilePage.posts}
                          // newText= {props.newText}
                          // dispatch={props.dispatch}
        />
    </div>
}

export default Profile;