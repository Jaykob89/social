import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import store from "./redux/state";

let rerenderEntireTree = () => {

 ReactDOM.render(
     <React.StrictMode>
      <App state={store._state} addPost={store.addPost.bind(store)}
           changeNewText={store.changeNewText.bind(store)}
           addMessage={store.addMessage.bind(store)}
           changeNewMessageText={store.changeNewMessageText.bind(store)}/>
     </React.StrictMode>,
     document.getElementById('root')
 );

}

store.subscribe(rerenderEntireTree);
rerenderEntireTree();