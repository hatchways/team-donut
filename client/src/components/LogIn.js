import React, { Component } from 'react'
import '../App.css';
import babyFund from './images/babyFund.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:3001/routes/api/user/login', userData)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(JSON.stringify(err)))
  }
  signup = () => {
    window.location.href = "/signup"
  }

  loggedin = () => {
    console.log('logged in!')
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>

        <div className="col-lg-6">
          <img src={babyFund} className="logo" />

          <form id="login" onSubmit={this.handleSubmit}>
            <h3 className="mb-5">Log In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" name='email' onChange={this.handleChange} value={this.state.email} placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name='password' onChange={this.handleChange} value={this.state.password} placeholder="Password" />
            </div>

            <Link to="/forgotpswd" style={{ color: 'black' }}>Forgot Password?</Link>
            <br />

            <button type="submit" className="btn btn-dark login" onClick={this.loggedin}>Log In</button>
          </form>
        </div>

        <div className="col-lg-6 bigPic">
          <button type="button" className="btn btn-outline-light signup" onClick={this.signup}>Sign Up</button>
        </div>

      </div>
    )
  }
}

