import React, { Component } from 'react'
import Thumbnail from './thumbnail'
import './thumbGrid.css'

export default class ReplaceImg extends Component {    
    render() {
        let { thumbnails } = this.props

        return (
            <div id="thumbnailGrid">
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
