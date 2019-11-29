import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from '../Dropzone/Dropzone'
import './Details.css'
import axios from 'axios'
import $ from 'jquery'
import { getFundInfo, handleServerEditApi, addPhotos } from '../../redux/actions/fundActions'

export class EditDetails extends Component {
    state = {
        currentState: '',
        fundToggle: false,
        updateEdit: false,
        editFund: false,
        photos: []
    }

    componentDidMount() {
        this.setState({
            currentState: this.props.desc
        })
    }

    editFund = () => {
        this.setState(prevState => ({
            editFund: !prevState.editFund
        }), () => {
            if(!this.state.editFund) {
                this.setState({
                    editFund: false
                })
            }
        })
    }

    // when done editing
    handleEditing = (id) => {
        this.setState(prevState => ({
            updateEdit: !prevState.updateEdit,
            fundToggle: !prevState.fundToggle
        }), () => {
            if(!this.state.fundToggle) {
                this.handleFinalChange(id, this.state.currentState)
                this.setState({
                    updateEdit: false
                })
            }
        })
    }

    handleUpdateEdit = (id) => {
        this.setState({
            currentState: this.refs.updateDesc.value
        })
    }

    handleFinalChange = (id) => {
        this.props.handleServerEdit(id, this.state.currentState)
    }

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

    // ShowAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {       
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );

		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
        $(alertEl).css( 'background', background );
        $(alertEl).css({'position': 'absolute', 'right': '71px', 'width': '30%', 'padding': '5px 10px' });
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );

		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
    };
    
    uploadMorePics = event => {
        event.preventDefault();
        this.props.addPhotos(this.props.item._id, this.state.photos) 
        setTimeout(() => {
            window.location.reload(false);
        }, 1000)         
    }

    render() {      
        return (
            <div style={{fontWeight: 'normal'}}>
                {this.state.updateEdit ?
                    <textarea 
                        onChange={this.handleUpdateEdit.bind(this, this.props.item._id)} 
                        value={this.state.currentState} 
                        className="w-100"
                        style={{minHeight: '250px'}}
                        ref="updateDesc"
                    /> : this.props.desc}
                    {this.state.editFund ? 
                    <div>       
                        <button 
                        style={{
                            backgroundColor: '#efefef',
                            textTransform: 'capitalize',
                            padding: '10px',
                            color: '#000000',
                            width: '24.2%',
                            position: 'absolute',
                            right: '7rem',
                            top: '11rem'
                        }}
                        onClick={() => {
                            this.editFund(); this.handleEditing(this.props.item._id);
                        }} 
                        className="edit">Done Editing</button> 
                        <div 
                        style={{
                            width: '30%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            flexDirection: 'column',
                            position: 'absolute',
                            right: '4.5rem',
                            top: '15rem'
                        }}>
                            <Dropzone id={this.props.item._id} photos={this.multipleFileUploadHandler} />
                            <button 
                                className="btn btn-dark uploadMorePics" 
                                onClick={this.uploadMorePics}>Upload</button>
                        </div>
                    </div>
                             :
                            <button 
                            className="editFund"
                            style={{
                                backgroundColor: '#efefef',
                                textTransform: 'capitalize',
                                padding: '10px',
                                color: '#000000',
                                width: '24.2%',
                                position: 'absolute',
                                right: '7rem',
                                top: this.props.goLive === true ? '21rem' : '11rem'
                            }}
                            onClick={() => {
                                this.editFund(); this.handleEditing(this.props.item._id);
                            }} 
                            className="edit">Edit Fund</button>
                    }
                    {/* For Alert box */}
                    <div id="oc-alert-container"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    fund: state.fund_state
})

export default connect(mapStateToProps, { getFundInfo, handleServerEditApi, addPhotos })(EditDetails)
