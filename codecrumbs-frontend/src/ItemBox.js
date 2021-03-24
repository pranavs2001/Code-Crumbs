import React, { Component } from 'react'

export default class ItemBox extends Component {

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
            
        } else if (this.props.isCurrent) {
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
                    <div className="imagePlaceholder"></div>
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <p style={{marginLeft: '4px'}} className='extensionH2'>{this.props.title}</p>
                    </div>
                    {this.state.isHovering ? <div className="iconBox" style={{display: 'flex', flexDirection: 'row'}}>
                        <button onClick={this.props.onButton1Press} style={{width: '20px', height: '20px', padding: '0px'}}>
                            <img style={{width: '20px', height: '20px', padding: '0px'}} src="https://media.discordapp.net/attachments/680983182195425354/824091788389384242/ab67706c0000bebb180554d929cae4cf02eb3ec6.png"/>
                        </button>
                        <button onClick={this.props.onButton2Press} style={{width: '20px', height: '20px', padding: '0px'}}>
                            <img style={{width: '20px', height: '20px', padding: '0px'}} src="https://media.discordapp.net/attachments/680983182195425354/824091788389384242/ab67706c0000bebb180554d929cae4cf02eb3ec6.png"/>
                        </button>
                    </div> : ''}
                </div>
                {comment}
            </div>
        )
    }
}