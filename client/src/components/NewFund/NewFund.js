import React, { Component } from 'react'
import './NewFund.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Dropzone from '../Dropzone/Dropzone';
import axios from 'axios'
import $ from 'jquery'
import { signup } from '../../redux/actions/authActions';
import { fundApi } from '../../redux/actions/fundActions';
import { connect } from 'react-redux';
import TimePicker from '../TimePicker';
import jwt_decode from 'jwt-decode';

var counter = 0;

class NewFund extends Component {
    state = {
        babyName: '',
        details: '',
        goal: '',
        date: '',
        timeZone: '',
        photos: [],
        dateToISOStr: ''
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleDateChange = (event) => {
        let date = event.toString()
        let datePt = date.split(' ').slice(0, 4).join(' ')

        let dateValue = document.getElementById('date-picker-dialog').value
        let selectedDate = date.split(' ').slice(0, 4).join(' ')

        let d = new Date(selectedDate)
        dateValue = d.toLocaleDateString()   

        this.setState({
            date: dateValue,
            dateToISOStr: datePt
        })
    }

    handleClick = () => {
        counter++

        if(counter % 2 === 1) {
            this.setState({
                open: true
            })
        } else {
            this.setState({
                open: false
            })
        }
    };

    multipleFileUploadHandler = (files) => {
        const data = new FormData();    
        let fileArray = Object.assign([], files)
    
        // If file selected
        if ( files ) {
            for ( let i = 0; i < fileArray.length; i++ ) {
                data.append( 'imageGallery', fileArray[i], fileArray[i].name );
            }
            axios.post( 'http://localhost:3001/api/profile/multiple-file-upload', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
            .then( ( response ) => {
                
                if ( 200 === response.status ) {
                    // If file size is larger than expected.
                    if( response.data.error ) {
                        if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                            this.ocShowAlert( 'Max size: 2MB', 'red' );
                        } else if ( 'LIMIT_UNEXPECTED_FILE' === response.data.error.code ){
                            this.ocShowAlert( 'Max 4 images allowed', 'red' );
                        } else {
                            // If any error other than the exceeded file size                           
                            this.ocShowAlert( response.data.error, 'red' );
                        }
                    } else {
                        // Success
                        let fileName = response.data;
                        this.setState({
                            photos: fileName.locationArray
                        })                  
                        this.ocShowAlert( `Files Uploaded`, '#3089cf' );
                    }
                }
            })
            .catch( ( error ) => {
                // If another error
                this.ocShowAlert( error, 'red' );
            });
        } else {
            // if file not selected throw error
            this.ocShowAlert( 'Please upload file', 'red' );
        }

    };

    submitForm = (event) => {
        event.preventDefault();
        this.props.fundApi(this.state) 
        
        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token)
        window.location.href = `/funds/${decoded.id}`
    }

    timeDropdown = () => {   
        let selection = document.getElementById('timeZone');
        let index = selection.selectedIndex;
        let selectedValue = selection.options[index].value;

        this.setState({
            timeZone: selectedValue
        })     
    }

	// ShowAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {       
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );

		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );

		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
	};

    render() {       
        return (
            <div>  
                <h1>Create New Fund</h1>  

                <form className="fundbox" onSubmit={this.submitForm}>                   
                    <p>What is your cause you'd like to fundraise for?</p>
                    <input placeholder="Baby Name (Jane Doe)" name="babyName" onChange={this.handleInput} />
                    <br />
                    <p>Description</p>
                    <textarea placeholder="Details about your new born baby" name="details" onChange={this.handleInput} style={{height: '13em'}} />
                    <br />

                    <div className="goalDeadline">
                        <div>
                            <p>Goal</p>
                            <input id="goal" name="goal" onChange={this.handleInput} placeholder="100.00" />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p>Deadline (18 years old)</p>

                            <div id="datePicker" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            {/* Date Picker */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="flex-start">
                                <KeyboardDatePicker
                                    disableToolbar
                                    style={{border: '1px solid', maxHeight: '51.67px'}}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    onChange={this.handleDateChange}
                                    value={!this.state.date ? this.selectedDate : this.state.date}                 
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <TimePicker timeChange={this.handleTimeChange} />
                                
                                <select id="timeZone" onChange={this.timeDropdown}>
                                    <option value="-1">Please select a time zone</option>
                                    <option value="HST">HST (Hawaii Standard Time)</option>
                                    <option value="AKST">AKST (Alaskan Standard Time)</option>
                                    <option value="PST">PST (Pacific Standard Time)</option>
                                    <option value="MST">MST (Mountain Standard Time)</option>
                                    <option value="CST">CST (Central Standard Time)</option>
                                    <option value="EST">EST (Eastern Standard Time)</option>
                                </select>

                                </Grid>
                            </MuiPickersUtilsProvider>                            
                            </div>
                        </div>
                    </div>

                    <div>
                        <p>Upload Photo(s)</p>
                        <Dropzone photos={this.multipleFileUploadHandler} />
                    </div>
                    {/* For Alert box */}
				    <div id="oc-alert-container"></div>

                    <button className="btn btn-dark submitFund">Submit Fund</button>
                </form>{/* End fundbox */}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fund: state.fund_state,
    user: state.auth_state
})

export default connect(mapStateToProps, { signup, fundApi })(NewFund)
