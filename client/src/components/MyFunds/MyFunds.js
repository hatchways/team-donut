import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFundInfo } from '../../redux/actions/fundActions'
import './MyFunds.css'

class MyFunds extends Component {
    state = {}

    componentDidMount() {
        this.props.getFundInfo()
    }

    detailsPage = (id) => {
        window.location.href = `/details/${id}`
    }

    render() {
        let { funds } = this.props.fund

        let fundsArr = funds.map((item, index) => {
            return (
                <li key={item._id}>
                    <div>  
                        <div id="name"><h3>{item.name}</h3></div>                   
                        <img src={item.photo[0]} />                      
                    </div>
                    <div style={{backgroundColor: 'white'}}>
                        <button onClick={this.detailsPage.bind(this, item._id)}>Details</button>
                    </div>
                </li>
            )
        })
        
        return (
            <div className="container">
                <input 
                    style={{padding: '5px', borderRadius: '30px', width: '45%'}} 
                    placeholder="Search fund by name" 
                />
                <h2 id="fundHeading">
                    My active funds&nbsp;
                    <span style={{fontWeight: 'normal', fontSize: '1.5rem', color: '#AAA'}}>
                        ({funds.length})
                    </span>
                </h2>

                <ul id="fundContainer">
                    {fundsArr}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fund: state.fund_state
})

export default connect(mapStateToProps, { getFundInfo })(MyFunds)
