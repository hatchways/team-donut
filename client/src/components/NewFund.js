import React, { Component } from 'react'
import './NewFund.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Dropzone from './Dropzone';
import axios from 'axios'
import $ from 'jquery'
import { signup, login } from '../redux/actions/authActions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    border: {
        border: theme.spacing(1),
    },
    root: {
        width: '100%',
        maxWidth: 360,
        padding: '0 !important'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

var counter = 0;

class NewFund extends Component {
    state = {
        open: false
    }

    MaterialUIPickers = () => {
        // The first commit of Material-UI
        const setSelectedDate = React.useState(new Date());
      
        const handleDateChange = date => {
          setSelectedDate(date);
        };
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
                        this.ocShowAlert( 'Files Uploaded', '#3089cf' );
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

                <div className="fundbox">                   
                    <p>What is your cause you'd like to fundraise for?</p>
                    <input placeholder="Baby Name (Jane Doe)" />
                    <br />
                    <p>Description</p>
                    <textarea placeholder="Details about your new born baby" style={{height: '13em'}} />
                    <br />

                    <div className="goalDeadline">
                        <div>
                            <p>Goal</p>
                            <input id="goal" placeholder="100.00" />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p>Deadline (18 years old)</p>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            {/* Date Picker */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="flex-start">
                                <KeyboardDatePicker
                                    disableToolbar
                                    style={{border: '1px solid', maxHeight: '51.67px'}}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    value={this.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardTimePicker
                                    style={{border: '1px solid', maxHeight: '51.67px'}}
                                    margin="normal"
                                    id="time-picker"
                                    value={this.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                                    <List 
                                        component="nav" 
                                        aria-labelledby="nested-list-subheader" 
                                        className={useStyles.root} 
                                        style={{border: '1px solid', height: '51.67px', top: '16px', width: '33.5%'}}>

                                        <ListItem button onClick={this.handleClick}>
                                            <ListItemText primary="Select Time Zone" />
                                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                            <ListItem button className={useStyles.nested} 
                                            style={{flexDirection: 'column', alignItems: 'flex-start'}}>                                 
                                                <ListItemText>HST (Hawaii Standard Time)</ListItemText>
                                                <ListItemText>AKST (Alaskan Standard Time)</ListItemText>
                                                <ListItemText>PST (Pacific Standard Time)</ListItemText>
                                                <ListItemText>MST (Mountain Standard Time)</ListItemText>
                                                <ListItemText>CST (Central Standard Time)</ListItemText>
                                                <ListItemText>EST (Eastern Standard Time)</ListItemText>
                                            </ListItem>
                                            </List>
                                        </Collapse>

                                    </List>
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

                    <button className="btn btn-dark submitFund" onClick={this.singleFileUploadHandler}>Submit Fund</button>
                </div>{/* End fundbox */}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth_state
})

export default connect(mapStateToProps, { signup, login })(NewFund)
