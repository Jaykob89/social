import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {RootStateType, tcarActionType} from "./redux/store";

type propsType = {
    state: RootStateType
    dispatch:(action:tcarActionType)=>void
}


const App = (props: propsType) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs state={props.state}
                                                                  dispatch={props.dispatch}
                                                                  newMessageText={props.state.massagesPage.newMessageText}
                    />}
                    />
                    <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}
                                                                  newText={props.state.profilePage.newPostText}
                                                                  dispatch={props.dispatch}


                    />}/>
                </div>

            </div>

        </BrowserRouter>);
}
export default App;



