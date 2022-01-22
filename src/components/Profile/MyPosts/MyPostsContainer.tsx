import React from 'react';
import {addPostAC} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootStateType} from "../../../redux/store";

const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;