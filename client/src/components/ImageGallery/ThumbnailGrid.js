import React, { Component } from 'react'
import Thumbnail from './thumbnail'
import './thumbGrid.css'

export default class ReplaceImg extends Component {    
    render() {
        let { thumbnails } = this.props
        let numOfRows = Math.ceil(thumbnails.length / 5)

        return (
            <div id="thumbnailGrid" style={{gridTemplateRows: `repeat(${numOfRows}, 7rem)`}}>
                {
                    thumbnails.map((thumbnail, i) => {
                        return (
                            <Thumbnail
                                key={thumbnail}
                                imgUrl={thumbnail}
                                handleClick={this.props.handleClick}
                                index={i}
                            />
                        )
                    })
                }
            </div>
        )
    }
}
