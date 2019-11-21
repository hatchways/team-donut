import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Messages extends Component {
    render() {
        return (
            <div>
                Messages
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
