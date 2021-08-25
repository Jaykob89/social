import {state, subscribe} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addMessage, addPost, changeNewMessageText, changeNewText, RootStateType} from "./redux/state";


let rerenderEntireTree = (state:RootStateType) => {

 ReactDOM.render(
     <React.StrictMode>
      <App state={state} addPost={addPost} changeNewText={changeNewText} addMessage={addMessage} changeNewMessageText={changeNewMessageText}/>
     </React.StrictMode>,
     document.getElementById('root')
 );

}
rerenderEntireTree(state);

subscribe(rerenderEntireTree);