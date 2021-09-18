import React, {ChangeEvent} from 'react';
import Post from "./Post/Post";
import {StoreType, tcarActionType} from "../../../redux/store";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";

type postsType = {
    id: number
    message: string
    likesCount: number
}
type myPostPropsType = {
    // posts: Array<postsType>
    store:StoreType
    // addPost: () => void
    // newText:string
    // changeNewText:(newText:string)=>void
    // dispatch:(action:tcarActionType)=>void
}



const MyPostsContainer = (props: myPostPropsType) => {

    // let posts = [
    //     {id: 1, message: 'Hi, how are You', likesCount: 125},
    //     {id: 2, message: "It's my first post", likesCount: 23},
    // ]
    let state = props.store.getState();

    let addPost = () => {
            props.store.dispatch(addPostAC())
    }

    let onPostChange = (text:string)=>{
        props.store.dispatch(updateNewPostTextAC(text))
    }

    return (
        <MyPosts changeNewText={onPostChange} addPost={addPost} posts={state.profilePage.posts} newText={state.profilePage.newPostText}/>
    )
}

export default MyPostsContainer;