import React, { Component } from 'react'
import babyFund from './images/babyFund.png'
import noUser from './images/noUser.gif'
import './Header.css'

export default class Header extends Component {

    newFund = () => {
        window.location.href = "/newfund"
    }

    render() {
        return (
            <div className="heading">
                <img src={babyFund} alt="" />
                <ul className="nav" style={{alignItems: 'center', position: 'absolute', right: '0', top: '1rem'}}>
                    <li className="nav-item">
                        <a className="nav-link active" href="/messages">Message</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/myfunds">My Funds</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profiles">Browse Profiles</a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-outline-dark w-100 m-0" onClick={this.newFund}>Create New Fund</button>
                    </li>
                    <li className="nav-item d-flex">
                        <img src={noUser} alt="" style={{width: '35px', height: '35px', marginLeft: '1rem'}} />
                        <a className="nav-link" href="/myprofile">My Profile</a>
                    </li>
                </ul>
            </div>
        )
    }
}
