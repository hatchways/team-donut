import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFundInfo } from '../../redux/actions/fundActions'
import jwt_decode from 'jwt-decode'
import './Details.css'
import Thumbnails from '../ImageGallery/Thumbnails'

var location = window.location.href.split('/')
var pageID = location[location.length-1]

class Details extends Component {
    state = {
        isLive: false,
        isActive: false,
        goal: '',
        dueDate: '',
        picArr: []
    }

    componentDidMount() {
        this.props.getFundInfo()
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

    editProfile = () => {
        console.log('edit')
    }

    donate = () => {
        console.log('donate')
    }

    render() {
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)      

        let { funds } = this.props.fund

        let chosen = funds.map(item => {
            if(item._id === pageID) {
                return (
                    <div key={item._id}>
                        <h2>{item.name}</h2>
                        <p style={{fontWeight: 'normal'}}>
                            Created by&nbsp;
                            <a style={{color: '#168df5'}} href="/myProfile">{decoded.user.name}</a>
                        </p>
                        <Thumbnails picArray={item.photo} />
                        <div className="description" style={{marginBottom: '1rem'}}>
                            <h3>Description</h3>
                            <p style={{fontWeight: 'normal'}}>{item.description}</p>
                        </div>
                    </div>
                )
            }
            return ''
        })

        return (
            <div className="container" id="detailsContainer">
                <div>{chosen}</div>
                {!this.state.isLive ?
                    <div id="detailBtns" className="buttons" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <button onClick={this.goLive}>Go Live</button>
                        <button onClick={this.editProfile}>Edit Fund</button>
                    </div> :
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
    fund: state.fund_state
})

export default connect(mapStateToProps, { getFundInfo })(Details)
