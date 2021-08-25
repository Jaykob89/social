import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {RootStateType} from "./redux/state";

type propsType = {
    state: RootStateType
    addPost: () => void
    changeNewText: (newText: string) => void
    addMessage:()=>void
    changeNewMessageText:(messageText:string)=>void
}


const App = (props: propsType) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs state={props.state} addMessage={props.addMessage} changeNewMessageText={props.changeNewMessageText}
                                                                  newMessageText={props.state.massagesPage.newMessageText}/>}/>
                    <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}
                                                                  newText={props.state.profilePage.newPostText}
                                                                  addPost={props.addPost}
                                                                  changeNewText={props.changeNewText}

                    />}/>
                </div>

            </div>

        </BrowserRouter>);
}
export default App;



