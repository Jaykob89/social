import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialog-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";


let rootReducer = combineReducers(
    {
        profilePage:profileReducer,
        massagesPage:dialogReducer,
        sideBar:sideBarReducer,
        users:usersReducer,
    });


export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer);