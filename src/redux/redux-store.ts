import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogReducer} from "./dialog-reducer";
import {sideBarReducer} from "./sidebar-reducer";


let reducers = combineReducers(
    {
        profilePage:profileReducer,
        massagesPage:dialogReducer,
        sideBar:sideBarReducer
    });


export let store = createStore(reducers);