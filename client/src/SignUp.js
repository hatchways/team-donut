import React, { Component } from 'react'
import './App.css';
import babyFund from './babyFund.png';

export default class SignUp extends Component {
    login = () => {
        window.location.href = "/"
    }

    created = () => {
        console.log('account created!')
    }

    render() {
        return (
            <div style={{display: 'flex'}}>

            <div className="col-lg-6">
              <img src={babyFund} className="logo" />
      
              <form id="signup">
                <h3 className="mb-5">Create an account</h3>

                <div className="form-group">
                  <label>Your name</label>
                  <input type="text" className="form-control" placeholder="Enter your name" />
                </div>
      
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" />
                </div>
      
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>
      
                <input type="checkbox" style={{marginRight: '3px'}} />
                <label style={{textTransform: 'capitalize'}}>
                    By signing up I agree with <span style={{color: 'black'}}>terms and conditions</span>
                </label>
                <br />
      
                <button type="button" className="btn btn-dark login" onClick={this.created}>Create</button>    
              </form>
            </div>
      
            <div className="col-lg-6 bigPic">
              <button type="button" className="btn btn-outline-light signup" onClick={this.login}>Log In</button>
            </div>
      
            </div>
        )
    }
}
