import React from 'react';
import {addPostAC} from "../../../redux/profile-reducer"
import MyPosts, {dispatchPropsType, mapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }as mapPropsType
}

const MyPostsContainer = connect<mapPropsType,dispatchPropsType,{},AppStateType>(mapStateToProps, {
    addPost:addPostAC
})(MyPosts)

export default MyPostsContainer;