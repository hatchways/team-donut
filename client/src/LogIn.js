import React, { Component } from 'react'
import './App.css';
import babyFund from './babyFund.png';
import { Link } from 'react-router-dom';

export default class LogIn extends Component {

  signup = () => {
    window.location.href = "/signup"
  }

  loggedin = () => {
    console.log('logged in!')
  }

  render() {
    return (
      <div style={{display: 'flex'}}>

      <div className="col-lg-6">
        <img src={babyFund} className="logo" />

        <form id="login">
          <h3 className="mb-5">Log In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" />
          </div>

          <Link to="/forgotpswd" style={{color: 'black'}}>Forgot Password?</Link>
          <br />

          <button type="button" className="btn btn-dark login" onClick={this.loggedin}>Log In</button>    
        </form>
      </div>

      <div className="col-lg-6 bigPic">
        <button type="button" className="btn btn-outline-light signup" onClick={this.signup}>Sign Up</button>
      </div>

      </div>
    )
  }
}

