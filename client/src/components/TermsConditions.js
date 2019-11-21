import React, { Component } from 'react'
import { connect } from 'react-redux'

export class TermsConditions extends Component {
    render() {
        return (
            <div>
                Terms and Conditions
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions)
