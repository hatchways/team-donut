import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import PswdRecover from './components/PswdRecover';
import Header from './components/Header';
import NewFund from './components/NewFund';
import Messages from './components/Messages';
import MyFunds from './components/MyFunds';
import Profiles from './components/Profiles';
import MyProfile from './components/MyProfile';
import './App.css';

export default class App extends Component {
    render() {
        const token = localStorage.getItem('token');

        return (
            <Provider store={store}>
                <Router>
                    <div>
                        {token ? <Header /> : ''}
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/forgotpswd" component={PswdRecover} />
                            <Route exact path="/newfund" component={NewFund} />
                            <Route exact path="/messages" component={Messages} />
                            <Route exact path="/myfunds" component={MyFunds} />
                            <Route exact path="/profiles" component={Profiles} />
                            <Route exact path="/myprofile" component={MyProfile} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}
