import React, {ChangeEvent} from 'react';
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";


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


const MyPostsContainer = (props: myPostPropsType) => {

    // let posts = [
    //     {id: 1, message: 'Hi, how are You', likesCount: 125},
    //     {id: 2, message: "It's my first post", likesCount: 23},
    // ]
    // let state = props.store.getState();


    return (
        <StoreContext.Consumer>{
            (store) => {

                let addPost = () => {
                    store.dispatch(addPostAC())
                }

                let onPostChange = (text: string) => {
                    store.dispatch(updateNewPostTextAC(text))
                }
                let state = store.getState()
                return <MyPosts changeNewText={onPostChange}
                                addPost={addPost}
                                posts={state.profilePage.posts}
                                newText={state.profilePage.newPostText}/>
            }}
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;