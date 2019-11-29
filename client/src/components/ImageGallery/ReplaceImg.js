import React, { Component } from 'react'

export default class ReplaceImg extends Component {
    // picSettings = () => {
    //     let setBtn = document.createElement('button')
    //     setBtn.innerHTML = 'btn'
    //     setBtn.style.cssText = 'zIndex:1; background-color:black; color:white'
    //     console.log(setBtn)
    //     console.log('working')
    // }

    render() {
        let { activeThumbnail } = this.props

        return (
            <div className="smallerPic" onMouseOver={this.picSettings} style={styles}>
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
