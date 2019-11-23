import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFundInfo } from '../../redux/actions/fundActions'
import jwt_decode from 'jwt-decode'
import './Details.css'
import ReplaceImg from '../ImageGallery/ReplaceImg'
import Thumbnails from '../ImageGallery/Thumbnails'

class Details extends Component {
    state = {}

    componentDidMount() {
        this.props.getFundInfo()
    }

    render() {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)      

        let { funds } = this.props.fund
        let location = window.location.href.split('/')
        let pageID = location[location.length-1]

        let chosen = funds.map(item => {
            // item.photo.map(pic => {
            //     images.push(pic)
            // })

            if(item._id === pageID) {
                return (
                    <div key={item._id}>
                        <h2>{item.name}</h2>
                        <p style={{fontWeight: 'normal'}}>
                            Created by&nbsp;
                            <a style={{color: '#168df5'}} href="/myProfile">{decoded.user.name}</a>
                        </p>
                        <Thumbnails picArray={item.photo} />
                        <h3>Description</h3>
                        <p style={{fontWeight: 'normal'}}>{item.description}</p>
                    </div>
                )
            }
        })
        console.log(chosen);
              

        return (
            <div className="container" id="detailsContainer">
                <div>{chosen}</div>
                <div id="detailBtns" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <button>Go Live</button>
                    <button>Edit Profile</button>
                </div>        
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fund: state.fund_state
})

export default connect(mapStateToProps, { getFundInfo })(Details)
