import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

type postsType = {
    id: number
    message: string
    likesCount: number
}

type myPostPropsType = {
    posts: Array<postsType>
    addPost: () => void
    newText:string
    changeNewText:(text:string)=>void
    // dispatch:(action:tcarActionType)=>void
}


const MyPosts = (props: myPostPropsType) => {
    // let posts = [
    //     {id: 1, message: 'Hi, how are You', likesCount: 125},
    //     {id: 2, message: "It's my first post", likesCount: 23},
    // ]
    let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)


    let OnAddPost = () => {
            props.addPost()
    }

    let onPostChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.changeNewText(e.currentTarget.value)
    }

    return <div className={s.postBlock}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea onChange={onPostChange}  value={props.newText}/>
            </div>
            <div>
                <button onClick={OnAddPost}>Add post</button>
            </div>
        </div>
        <div className={s.posts}>
            {postsElement}
        </div>
    </div>
}


export default MyPosts;