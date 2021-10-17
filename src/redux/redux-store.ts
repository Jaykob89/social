import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialog-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";


let rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        massagesPage: dialogReducer,
        sideBar: sideBarReducer,
        users: usersReducer,
        auth:authReducer,
    });


export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);