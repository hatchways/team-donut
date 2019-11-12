import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './LogIn';
import SignUp from './SignUp';
import PswdRecover from './PswdRecover';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/forgotpswd" component={PswdRecover} />
                </Switch>
            </Router>
        )
    }
}
