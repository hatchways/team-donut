import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MyProfile extends Component {
    render() {
        return (
            <div>
                MyProfile
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
