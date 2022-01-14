import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type postsType = {
    id: number
    message: string
    likesCount: number
}

type FormDataType = {
    newPostText:string
}

type myPostPropsType = {
    posts: Array<postsType>
    addPost: (newPostText:string) => void
    newText: string
}


const MyPosts = (props: myPostPropsType) => {
    let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let OnAddPost = (values:FormDataType) => {
        props.addPost(values.newPostText)
    }

    return <div className={s.postBlock}>
        <h3>My posts</h3>
        <AddPostFormRedux onSubmit={OnAddPost}/>
        <div className={s.posts}>
            {postsElement}
        </div>
    </div>
}


const AddPostForm:React.FC<InjectedFormProps<FormDataType>> = (props)=>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={'textarea'} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<FormDataType>({form:"ProfileAddNewPostForm"})(AddPostForm)
export default MyPosts;