import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {RootStateType, StoreType, tcarActionType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

type propsType = {
    state: RootStateType
    dispatch: (action: tcarActionType) => void
    store: StoreType
}


const App = (props: propsType) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() =>
                        <DialogsContainer store={props.store}
                        />}
                    />
                    <Route path='/profile' render={() => <Profile
                        store={props.store}
                        // profilePage={props.state.profilePage}
                        // newText={props.state.profilePage.newPostText}
                        // dispatch={props.dispatch}


                    />}/>
                </div>

            </div>

        </BrowserRouter>);
}
export default App;



