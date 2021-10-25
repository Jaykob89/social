import React from 'react';
import s from './Post.module.css'

type messageType = {
    message: string
    likesCount: number
}

const Post = (props: messageType) => {
    return <div className={s.item}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU"/>
        {props.message}
        <div>
            <span>like </span>
            {props.likesCount}
        </div>

    </div>
}
export default Post;