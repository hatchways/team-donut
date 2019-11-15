import React, { Component } from 'react'
import '../App.css';
import babyFund from './images/babyFund.png';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/authActions';
import { connect } from 'react-redux';

class Login extends Component {
  state = {}

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.login(userData)
  }

  signup = () => {
    window.location.href = "/signup"
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
              <input type="email" className="form-control" name='email' onChange={this.handleChange} placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name='password' onChange={this.handleChange} placeholder="Password" />
            </div>

            <Link to="/forgotpswd" style={{ color: 'black' }}>Forgot Password?</Link>
            <br />

            <button type="submit" className="btn btn-dark login">Log In</button>
          </form>
        </div>

        <div className="col-lg-6 bigPic">
          <button type="button" className="btn btn-outline-light signup" onClick={this.signup}>Sign Up</button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth_state
})

export default connect(mapStateToProps, { login })(Login)

