import React, { Component } from 'react'

export default class Thumbnail extends Component {
    render() { 
        return (
            <div>
                <img
                    src={this.props.imgUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 0
                    }} 
                    onClick={this.props.handleClick}
                    dataindex={this.props.index}
                />
            </div>
        )
    }
}
