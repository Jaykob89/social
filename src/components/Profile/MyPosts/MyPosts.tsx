import React from 'react';
import s from './MyPosts.module.css'
const MyPosts = () => {
    return <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>

            </div>
            <div className = {s.posts}>
                <div className ={s.item}>
                    <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU"/>
                    Post 1
                </div>
                <div className = {s.item}>
                    <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU"/>
                    Post 2
                </div>
                <div className = {s.item}>
                    <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU"/>
                    Post 3
                </div>
                <div className = {s.item}>
                    Post 4
                </div>
                <div className = {s.item}>
                    Post 5
                </div>

            </div>
        </div>
}


export default MyPosts;