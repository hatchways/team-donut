import React, { Component } from 'react'
import { KeyboardTimePicker } from '@material-ui/pickers';
import { timeApi } from '../redux/actions/fundActions';
import { connect } from 'react-redux';

class TimePicker extends Component {
    state = {
        time: ''
    }

    onTimeChange = time => {
        this.setState({
            time
        }, () => {
            this.props.timeApi(this.state.time)
        })       
    }

    render() {
        return(
            <div>
                <KeyboardTimePicker
                    style={{border: '1px solid', maxHeight: '51.67px'}}
                    margin="normal"
                    id="time-picker"
                    format="hh:mm a"
                    onChange={this.onTimeChange}
                    value={!this.state.time ? this.selectedDate : this.state.time}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.auth_state
})

export default connect(mapStateToProps, { timeApi })(TimePicker)