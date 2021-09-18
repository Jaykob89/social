import React, {ChangeEvent} from 'react';
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {RootStateType} from "../../../redux/store";


// type postsType = {
//     id: number
//     message: string
//     likesCount: number
// }
type myPostPropsType = {
    // posts: Array<postsType>
    // store: StoreType
    // addPost: () => void
    // newText:string
    // changeNewText:(newText:string)=>void
    // dispatch:(action:tcarActionType)=>void
}


const mapStateToProps = (state:RootStateType) => {
  return {
      posts:state.profilePage.posts,
      newText:state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch:Dispatch)=>{
    return {
        changeNewText:(text:string)=>{
            dispatch(updateNewPostTextAC(text))
        },
        addPost: ()=>{
            dispatch(addPostAC())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)

export default MyPostsContainer;