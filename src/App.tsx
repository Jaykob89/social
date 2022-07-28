import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route, withRouter} from "react-router-dom";

import UsersContainer from "./components/Users/UsersContainer";

import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {RootStateType} from "./redux/store";
import {initializedApp} from "./redux/app-reducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/preloader/Preloader";
import {withSuspense} from "./HOC/withSuspense";

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


type mapDispatchType = {
    initializedApp: () => void
}

type mapStateToPropsType = {
    initialized: boolean
}

type propsType = mapDispatchType & mapStateToPropsType

class App extends React.Component<propsType, RootStateType> {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
            </BrowserRouter>);
    }

}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializedApp}))(App);

export let SamuraiJSApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}
