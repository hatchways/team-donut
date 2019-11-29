import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFundInfo } from '../redux/actions/fundActions'
import { allUsers } from '../redux/actions/profileActions'

class Profiles extends Component {
    state = {}

    componentDidMount() {
        this.props.allUsers(this.state)
    }

    render() {
        let { allUsers } = this.props.profile 

        let profileList = allUsers.map((item, index) => {
            return (
                <li key={item._id} style={{listStyleType: 'none'}}>
                    <a href={`/funds/${item._id}`}>{item.name}</a>
                </li>
            )
        })

        return (
            <ul>
                {profileList}
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile_state,
    fund: state.fund_state
})

export default connect(mapStateToProps, { allUsers, getFundInfo })(Profiles)
