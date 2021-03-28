import React, { Component } from 'react'

export default class ItemBox extends Component {

    //PROPS
    // comment(STRING) - a comment attached to the box
    // isCurrent(BOOLEAN) - changes styles to CurrentState if true
    // onCommentSubmit - a callback for when a comment is submitted
    // title - The title of the itembox
    // onButton1Press - callback for button1 press
    // onButton2Press - callback for button2 press
    // imageUrl - url for the icon

    constructor(props) {
        super(props)
        this.state = {
            newCommentValue: '',
            isHovering: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({newCommentValue: event.target.value})
    }

    handleSubmit(event) {
        this.props.onCommentSubmit(this.state.newCommentValue)
        event.preventDefault()
    }

    render() {

        let comment;
        var className = `itemBox ${this.props.isCurrent ? 'current ' : ''}`
        var marginStyle

        if (this.props.comment && !this.props.isCurrent) {
            comment = <p className="commentBox">{this.props.comment}</p>
            className += 'content '
            
        } else if (this.props.isCurrent && this.props.onCommentSubmit) {
            comment = 
            <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'row'}}>
                <label style={{width: '100%'}}>
                    <input type='text' value={this.state.newCommentValue} onChange={this.handleChange} placeholder={this.props.comment}/>
                </label>
            </form>

        } else {
            marginStyle = {marginBottom: '0px'}
        }

        return(
            <div className={className} onMouseEnter={() => this.setState({isHovering: true})} onMouseLeave={() => this.setState({isHovering: false})}>
                <div className="itemBoxContent" style={marginStyle}>
                    {this.props.imageUrl ? 
                        <div className="imagePlaceholder">
                            <img src={this.props.imageUrl} className="imagePlaceholder"></img>
                        </div>
                        : 
                        <div style={{height: '20px'}}></div>
                    }
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <p style={{marginLeft: '4px'}} className='extensionH2'>{this.props.title ? this.props.title.substring(0, 45).concat('...') : ''}</p>
                    </div>
                    {this.state.isHovering ?
                        <div className="iconBox" style={{display: 'flex', flexDirection: 'row', verticalAlign: 'center'}}>
                            <button className="iconButton" style={{width: '20px', height: '20px', padding: '0px'}} onClick={this.props.onButton1Clicked}>
                                <span style={{width: '20px', height: '20px', padding: '0px'}} class="material-icons md-18">delete</span>
                            </button>
                            <button className="iconButton" style={{width: '20px', height: '20px', padding: '0px', marginLeft: '4px'}} onClick={this.props.onButton2Clicked}>
                                <span style={{width: '20px', height: '20px', padding: '0px'}} class="material-icons md-18">star</span>
                            </button>
                        </div> 
                    : ''}
                </div>
                {comment}
            </div>
        )
    }
}