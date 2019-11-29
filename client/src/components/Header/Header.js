import React, { Component } from 'react'
import babyFund from '../images/babyFund.png'
import noUser from '../images/noUser.gif'
import './Header.css'
import { connect } from 'react-redux' 
import { login, logout } from '../../redux/actions/authActions'
import jwt_decode from 'jwt-decode'

class Header extends Component {
    state = {
        toggleMenu: false
    }

    componentDidMount() {
        this.props.login()
    }

    toggleMobileMenu = () => {
        this.setState(prevState => ({
            toggleMenu: !prevState.toggleMenu
        }), () => {
            if(!this.state.toggleMenu) {
                this.setState({
                    toggleMenu: false
                })
            }
        })
    }

    render() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token)

        return (
            <div>
            <div className="heading">
                <img src={babyFund} alt="" />
                <ul className="nav" style={{alignItems: 'center', position: 'absolute', top: '1rem', right: '2rem'}}>
                    <li className="nav-item desktopNav">
                        <a className="nav-link active" href="/messages">Message</a>
                    </li>
                    <li className="nav-item desktopNav">
                        <a className="nav-link" href={`/funds/${decoded.id}`}>My Funds</a>
                    </li>
                    <li className="nav-item desktopNav">
                        <a className="nav-link" href="/profiles">Browse Profiles</a>
                    </li>
                    <li className="nav-item desktopNav">
                        <a className="nav-link" href="/newFund">Create New Fund</a>
                    </li>
                    <li className="nav-item desktopNav d-flex">
                        <img className="profileImg" src={noUser} alt="" style={{width: '35px', height: '35px', marginLeft: '1rem'}} />
                        <a className="nav-link mypage" href="/myProfile">My Profile</a>
                    </li>
                    <li className="nav-item desktopNav">
                        <button className="btn btn-outline-dark w-100 m-0" onClick={this.props.logout}>Log Out</button>
                    </li>
                    <li className="mobileBtn">
                        <button className="btn btn-outline-dark w-100 m-0" onClick={this.toggleMobileMenu}>
                            <i className="fas fa-bars"></i>
                        </button>
                    </li>
                </ul>
            </div>
            {this.state.toggleMenu ?
                <ul className="nav mobileNav">
                    <li className="nav-item">
                        <a className="nav-link active" href="/messages">Message</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={`/funds/${decoded.id}`}>My Funds</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profiles">Browse Profiles</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/newFund">Create New Fund</a>
                    </li>
                    <li className="nav-item d-flex">
                        {/* <img className="profileImg" src={noUser} alt="" style={{width: '35px', height: '35px', marginLeft: '1rem'}} /> */}
                        <a className="nav-link mypage" href="/myProfile">My Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={{cursor: 'pointer'}} onClick={this.props.logout}>Log Out</a>
                    </li>
                </ul> : ''
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth_state
})

export default connect(mapStateToProps, { login, logout })(Header)
