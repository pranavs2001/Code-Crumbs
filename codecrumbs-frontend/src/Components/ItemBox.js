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
            isHovering: false,
            nlp: undefined
        }

        this.fetchnlp(props.fullUrl)

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

    fetchnlp(url) {
        const body = {
            websiteUrl: url
        }

        fetch('https://codecrumbs.uc.r.appspot.com/buzzwords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( res => res.json())
        .then( data => this.setState({nlp: data}))
    }

    render() {

        let comment;
        let nlp
        var className = `itemBox ${this.props.isCurrent ? 'current ' : ''}`
        var marginStyle

        console.log(nlp)

        if(this.state.nlp) {
            nlp = 
            <div style={{display: 'flex', flexDirection: 'row', verticalAlign: 'center', marginTop: '4px'}}>
                {this.state.nlp.map(item => {
                    if (!item.includes(' ')) {
                        console.log(`Item ${item} does not include ' '`)
                        return <p className="pill">{item}</p> 
                    } else {
                        console.log(`item ${item} has space`)
                        return null
                    }
                })}
            </div>
        }

        if (this.props.comment && !this.props.isCurrent) {
            comment = <p className="commentBox">{this.props.comment}</p>
            className += 'content '
            
        } else if (this.props.isCurrent && this.props.onCommentSubmit) {
            comment = 
            <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'row'}}>
                <label style={{width: '100%'}}>
                    <input style={{width: '331px'}} type='text' value={this.state.newCommentValue} onChange={this.handleChange} placeholder={this.props.comment}/>
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
                        <p style={{marginLeft: '4px'}} className='extensionH2'>{this.props.title}</p>
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
                {nlp}
                {comment}
            </div>
        )
    }
}