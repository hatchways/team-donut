import React, { Component } from 'react'
import { connect } from 'react-redux'
import { user } from '../../redux/actions/profileActions'
import { getFundDetails, handleServerEditApi, addPhotos, requestToFund } from '../../redux/actions/fundActions'
import './Details.css'
import Thumbnails from '../ImageGallery/Thumbnails'
import EditDetails from '../Details/EditDetails'
import jwt_decode from 'jwt-decode'

var location = window.location.href.split('/')
var pageID = location[location.length-1]

class Details extends Component {
    state = {
        isLive: false,
        isActive: false,
        description: '',
        goal: '',
        dueDate: '',
        picArr: []
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)

        const location = window.location.href
        const id = location.split('/').slice(-1).join('')
        this.props.getFundDetails(decoded.id, id)      
    }

    userForFund = (id) => {
        this.props.user(id)
    }

    goLive = () => {
        let { funds } = this.props.fund

        let filtered = funds.filter(f => {
            return f._id === pageID
        })

        const d = new Date(filtered[0].deadline)
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let year = d.getFullYear();

        let monthWord;
        switch(month) {
            case 1:
                monthWord = 'January';
                break;

            case 2:
                monthWord = 'February';
                break;

            case 3:
                monthWord = 'March';
                break;

            case 4:
                monthWord = 'April';
                break;

            case 5:
                monthWord = 'May';
                break;

            case 6: 
                monthWord = 'June';
                break;

            case 7: 
                monthWord = 'July';
                break;

            case 8:
                monthWord = 'August';
                break;

            case 9:
                monthWord = 'September';
                break;

            case 10:
                monthWord = 'October';
                break;

            case 11:
                monthWord = 'November';
                break;

            case 12:
                monthWord = 'December';
                break;

            default:
                monthWord = ''
        }

        let lastDigit = day.toString()[1]

        let digitStr;
        if(lastDigit === 1) {
            digitStr = 'st'
        } else if(lastDigit === 2) {
            digitStr = 'nd'
        } else if(lastDigit === 3) {
            digitStr = 'rd'
        } else {
            digitStr = 'th'
        }

        if(day === 11 || day === 12 || day === 13) {
            digitStr = 'th'
        }

        let dateStr = `${monthWord} ${day}${digitStr} ${year}`       

        this.setState({
            isLive: true,
            goal: filtered[0].goal,
            dueDate: dateStr
        })          
    }

    handleServerEdit = (id, updatedDesc) => {
        this.props.handleServerEditApi(id, updatedDesc)
    }

    requestAccess = (yourID, theirFundID) => {
        this.props.requestToFund(yourID, theirFundID)
    }

    // picSettings = () => {
    //     let setBtn = document.createElement('button')
    //     setBtn.innerHTML = 'btn'
    //     setBtn.style.cssText = 'zIndex:1; background-color:black; color:white'
    //     console.log(setBtn)
    //     console.log('working')
    // }

    donate = () => {
        console.log('donate')
    }

    render() {   
        var name;

        let { funds } = this.props.fund
        let { allUsers } = this.props.profile
        allUsers.map(item => {
            name = item.name
        })

        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)

        let userID = funds.map(item => {
            return item.user
        })

        let chosen = funds.map(item => {
            if(item._id === pageID) {
                return (
                    <div key={item._id} onLoad={this.userForFund.bind(this, item.user)}>
                        <h2>{item.name}</h2>
                        <p style={{fontWeight: 'normal'}}>
                            Created by&nbsp;
                            <a style={{color: '#168df5'}} href="/myProfile">{name}</a>
                        </p>
                        <Thumbnails onMouseOver={this.picSettings} picArray={item.photo} />
                        {userID[0] === decoded.id ?
                            <div className="description" style={{marginBottom: '1rem', marginTop: '4rem'}}>
                                <h3>Description</h3>                          
                                    <EditDetails 
                                        item={item} 
                                        goLive={this.state.isLive}
                                        editFund={this.state.editFund}
                                        desc={item.description} 
                                        updateDesc={this.state.editFund} 
                                        handleServerEdit={this.handleServerEdit}
                                    />                                                                    
                            </div> : ''
                        }
                    </div>
                )
            }
            return ''
        }) 
        const location = window.location.href
        const fundID = location.split('/').slice(-1).join('')

        return (
            <div className="container" id="detailsContainer">
                <div>{chosen}</div>

                {userID[0] !== decoded.id ?
                    <p style={{fontWeight: 'normal', textAlign: 'center', margin: 'auto 0'}}>
                        You currently do not have access to this page.<br />
                        Would you like to request access?<br />
                        <span onClick={this.requestAccess.bind(this, decoded.id, fundID)} style={{color: 'green', cursor: 'pointer', fontWeight: 'bold'}}>Request</span>
                    </p> :
                    !this.state.isLive ?
                    <div id="detailBtns" className="buttons" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <button onClick={this.goLive}>Go Live</button>
                    </div> 
                    :
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'normal'}}>
                        <div style={{backgroundColor: '#EEE', padding: '1rem 1.5rem', fontSize: '2rem'}}>
                            <strong>$0</strong> of ${this.state.goal}
                        </div>
                        <div style={{textAlign: 'center', marginTop: '10px'}}>
                            <p style={{color: 'green', margin: '0'}}>
                                This fund is currently active
                            </p>                       
                            <p>ends on <strong>{this.state.dueDate}</strong></p>
                            <button 
                                style={{
                                    backgroundColor: '#1fcbff', 
                                    color: '#FFF', padding: '10px', 
                                    width: '100%'
                                }}
                                onClick={this.donate}
                            >
                                Donate Now
                            </button>
                        </div>
                    </div>
                }
                  
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fund: state.fund_state,
    profile: state.profile_state
})

export default connect(mapStateToProps, { getFundDetails, handleServerEditApi, addPhotos, user, requestToFund })(Details)
