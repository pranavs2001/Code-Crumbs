function Button(props) {
    const active = props.active;
    
    return (
        <div className={'AbsPos1 Button1 TextCenter1' + ((active) ? ' Button-Selected1' : ' Button-Unselected1')} style={props.style}
            onClick={props.onClick}>
            {props.text}
        </div>
    );
}

export default Button;