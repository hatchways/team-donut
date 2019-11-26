import React, { Component } from 'react'

export default class ReplaceImg extends Component {
    render() {
        let { activeThumbnail } = this.props

        return (
            <div className="smallerPic" style={styles}>
                <img 
                    alt=""
                    src={activeThumbnail} 
                    style={{
                        width: '100%', 
                        height: '100%',
                        borderRadius: 0
                    }} 
                />
            </div>
        )
    }
}

const styles = {
    height: '65%',
    width: '100%',
    background: '#333'
}
