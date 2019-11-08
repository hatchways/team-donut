import React, { Component } from 'react'
import Header from './Header';
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

export default class NewFund extends Component {
    state = {
        open: false,
        setOpen: false
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

    render() {

        return (
            <div>
                <Header />   
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
                            <input placeholder="100.00" />
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
                                                <ListItemText>HST</ListItemText>
                                                <ListItemText>AKST</ListItemText>
                                                <ListItemText>PST</ListItemText>
                                                <ListItemText>MST</ListItemText>
                                                <ListItemText>CST</ListItemText>
                                                <ListItemText>EST</ListItemText>
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
                        <div className="uploadBox">
                            Click to choose files<br />
                            or<br />Drag and Drop <br />
                            <i className="fas fa-upload"></i>
                        </div>
                    </div>

                    <button className="btn btn-dark submitFund">Submit Fund</button>

                </div>{/* End fundbox */}
            </div>
        )
    }
}
