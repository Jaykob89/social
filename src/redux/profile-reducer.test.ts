import {addPostAC, deletePostAC, profileReducer} from "./profile-reducer";
import {postsType} from "./store";
import {profileType} from "../components/Profile/Profile";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are You', likesCount: 125},
        {id: 2, message: "It's my first post", likesCount: 23},
    ],
    profile: null,
    status: ""
}

type initialStateType = {
    posts: Array<postsType>
    profile: profileType | null
    status: string
}



test('new post should be added', ()=>{
    let action = addPostAC('it-kamasutra.com')
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(3)
})

test('new newMessage should be correct', ()=>{
    let action = addPostAC('it-kamasutra.com')
    let newState = profileReducer(state,action)

    expect(newState.posts[2].message).toBe('it-kamasutra.com')
})
test('delete messages should be correct', ()=>{
    let action = deletePostAC(1)
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(1)
})
