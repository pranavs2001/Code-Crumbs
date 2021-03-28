
function Timeline(props) {
    const active = props.activeButton;

    return (
        <div id={props.iden} className={'AbsPos1 ' + ((active) ? 'Timeline1' : 'Timeline-Hidden1') } style={props.style}
            onScroll={props.handleScroll}>
            {props.renderElements}
        </div>
    );
}

export default Timeline;