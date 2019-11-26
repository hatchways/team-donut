import React, { Component } from 'react'
import ReplaceImg from './ReplaceImg'
import ThumbnailGrid from './ThumbnailGrid'
import '../Details/Details.css'

export default class Thumbnails extends Component {
    state = {
        thumbnails: [],
        activeIndex: 0
    }

    componentDidMount() {
        this.setState({
            thumbnails: this.props.picArray
        })
    }

    renderThumbnails = () => {
        const { thumbnails, activeIndex } = this.state

        if(thumbnails.length) {
            return (
                <ReplaceImg activeThumbnail={thumbnails[activeIndex]} />
            )
        }
    }

    handleClick = (e) => {
        const newActiveIndex = e.target.getAttribute('dataindex')
        this.setState({
            activeIndex: newActiveIndex
        })
    }

    render() {  
        const { thumbnails } = this.state 

        return (
            <div style={thumbnailStyles} className="gallery">
                <div style={{ flex: 1 }}>
                    {this.renderThumbnails()}                  
                    <ThumbnailGrid
                        thumbnails={thumbnails}
                        handleClick={this.handleClick}
                    />
                </div>
            </div>
        )
    }
}

const thumbnailStyles = {
    backgroundColor: '#FFF',
    display: 'flex',
    marginTop: '1rem',
    marginBottom: '0.4rem',
    width: '44vw',
    height: '71vh'
}
