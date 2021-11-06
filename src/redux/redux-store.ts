import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialog-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";


let rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        massagesPage: dialogReducer,
        sideBar: sideBarReducer,
        users: usersReducer,
        auth: authReducer,
        form: formReducer
    });


export type AppStateType = ReturnType<typeof rootReducer>

export let store: Store = createStore(rootReducer, applyMiddleware(thunk));