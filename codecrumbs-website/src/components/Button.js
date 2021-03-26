function Button(props) {
    const active = props.active;

    return (
        <div className={'AbsPos Button TextCenter' + ((active) ? ' Button-Selected' : ' Button-Unselected')} style={props.style}
            onClick={props.onClick}>
            {props.text}
        </div>
    );
}

export default Button;