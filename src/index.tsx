import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType} from "./redux/state";
import store from "./redux/state";

let rerenderEntireTree = (state:RootStateType) => {

 ReactDOM.render(
     <React.StrictMode>
      <App state={state} addPost={store.addPost.bind(store)}
           changeNewText={store.changeNewText.bind(store)}
           addMessage={store.addMessage.bind(store)}
           changeNewMessageText={store.changeNewMessageText.bind(store)}/>
     </React.StrictMode>,
     document.getElementById('root')
 );

}
rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);