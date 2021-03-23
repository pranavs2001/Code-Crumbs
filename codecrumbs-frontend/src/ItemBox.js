import React, { Component } from 'react'

export default class ItemBox extends Component {
    state = {
        isHovered: false
    }

    onHovered = e => {
        this.setState({isHovered: e.target.value})
    }

    render() {
        return(
            <div className="itemBox">
                <div className="imagePlaceholder"></div>
                <p style={{marginLeft: '4px'}} className='extensionH2'>{this.props.title}</p>
            </div>
        )
    }
}