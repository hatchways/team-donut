import React, { Component } from 'react'
import './Dropzone.css'

export default class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.state = {
            highlight: null,
            picsExist: false,
            picArray: [],
            selectedFiles: null
        }
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    fileListToArray(list) {
        const array = [];
        for (var i = 0; i < list.length; i++) {
          array.push(list.item(i));
        }      
        return array;
    }

    onFilesAdded(evt) {
        if (this.props.disabled) return;
        const files = evt.target.files;
        
        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
          this.props.onFilesAdded(array);
        }  
        
        let picName = Object.values(files)

        this.setState({ 
            picsExist: true,
            picArray: picName,
            selectedFiles: evt.target.files
        }, () => {     
            this.props.photos(this.state.selectedFiles)
        });      
    }

    onDragOver(evt) {
        evt.preventDefault();     
        if (this.props.disabled) return;    
        this.setState({ highlight: true });
    }

    onDragLeave() {
        this.setState({ highlight: false });
    }

    onDrop(event) {
        // instead of event.target use event.dataTransfer
        event.preventDefault();
  
        if (this.props.disabled) return;   
        const files = event.dataTransfer.files; 

        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
          this.props.onFilesAdded(array);
        }

        let picName = Object.values(files)

        this.setState({ 
            highlight: false,
            picsExist: true,
            picArray: picName,
            selectedFiles: event.dataTransfer.files
        }, () => {
            this.props.photos(this.state.selectedFiles)
        });      
    }

    render() {
        let { picArray, picsExist } = this.state

        let nameList = picArray.map((item, index) => {
            return <li key={index}>{item.name}</li>
        })

        if(window.location.href === `http://localhost:3000/details/${this.props.id}`) {
            console.log('details')
        }

        return (
            <div style={{width: '100%'}}>
                <div  
                    className={`${this.state.highlight ? "Highlight" : "uploadBox"}`}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                    onClick={this.openFileDialog}
                    style={{ 
                        cursor: this.props.disabled ? "default" : "pointer",
                        marginBottom: picsExist ? '0' : '2.5rem'
                    }}
                >
                    Click to choose files<br />
                    or<br />Drag and Drop <br />
                    <i className="fas fa-upload"></i>
                    <input
                        ref={this.fileInputRef}
                        className="FileInput"
                        name="imageGallery"
                        type="file"
                        // multiple
                        onChange={this.onFilesAdded}
                    />
                </div>
                {
                    window.location.href === `http://localhost:3000/details/${this.props.id}` ?
                    <ul 
                        style={{ 
                            listStyleType: 'none'
                        }}
                    >
                        {nameList}
                    </ul> :
                    <ul className="nameList" style={{ margin: picsExist ? '2rem' : '0' }}>
                        {nameList}
                    </ul> 
                }                           
            </div>
        )
    }
}
