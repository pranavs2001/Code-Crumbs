import React, { Component } from 'react'

export default class ItemBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newCommentValue: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({newCommentValue: event.target.value})
    }

    handleSubmit(event) {
        // alert(this.state.newCommentValue)
        this.props.onCommentSubmit(this.state.newCommentValue)
        event.preventDefault()
    }

    render() {

        let comment;
        var className = `itemBox ${this.props.isCurrent ? 'current ' : ''}`
        let marginStyle

        if (this.props.comment && !this.props.isCurrent) {
            comment = <p className="commentBox">{this.props.comment}</p>
            className += 'content '
            
        } else if (this.props.isCurrent) {
            comment = 
            <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'row'}}>
                <label style={{width: '100%'}}>
                    <input type='text' value={this.state.newCommentValue} onChange={this.handleChange} placeholder="Enter a comment..."/>
                </label>
            </form>

        } else {
            marginStyle = {marginBottom: '0px'}
        }

        return(
            <div className={className}>
                <div className="itemBoxContent" style={marginStyle}>
                    <div className="imagePlaceholder"></div>
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <p style={{marginLeft: '4px'}} className='extensionH2'>{this.props.title}</p>
                    </div>
                </div>
                {comment}
            </div>

        )
    }
}