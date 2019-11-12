import React, { Component } from 'react'
import './App.css';
import babyFund from './babyFund.png';
import axios from 'axios';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:4000/api/user/register', user)
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>

        <div className="col-lg-6">
          <img src={babyFund} className="logo" />

          <form id="signup" onSubmit={this.handleSubmit}>
            <h3 className="mb-5">Create an account</h3>

            <div className="form-group">
              <label>Your name</label>
              <input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.name} />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" name="email" onChange={this.handleChange} value={this.state.email} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.password} />
            </div>

            <input type="checkbox" style={{ marginRight: '3px' }} />
            <label style={{ textTransform: 'capitalize' }}>
              By signing up I agree with <span style={{ color: 'black' }}>terms and conditions</span>
            </label>
            <br />

            <button type="submit" className="btn btn-dark login" >Create</button>
          </form>
        </div>

        <div className="col-lg-6 bigPic">
          <button type="button" className="btn btn-outline-light signup" onClick={this.login}>Log In</button>
        </div>

      </div>
    )
  }
}
