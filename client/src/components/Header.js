import React, { Component } from 'react'
import babyFund from './images/babyFund.png'
import noUser from './images/noUser.gif'
import './Header.css'
import { connect } from 'react-redux' 
import { logout } from '../redux/actions/authActions'

class Header extends Component {
    render() {
        return (
            <div className="heading">
                <img src={babyFund} alt="" />
                <ul className="nav" style={{alignItems: 'center', position: 'absolute', right: '0', top: '1rem', right: '2rem'}}>
                    <li className="nav-item">
                        <a className="nav-link active" href="/messages">Message</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/funds">My Funds</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Browse Profiles</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/newFund">Create New Fund</a>
                    </li>
                    <li className="nav-item d-flex">
                        <img src={noUser} alt="" style={{width: '35px', height: '35px', marginLeft: '1rem'}} />
                        <a className="nav-link" href="/myProfile">My Profile</a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-outline-dark w-100 m-0" onClick={this.props.logout}>Log Out</button>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth_state
})

export default connect(mapStateToProps, { logout })(Header)
