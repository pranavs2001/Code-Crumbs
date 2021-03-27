
function Timeline(props) {
    const active = props.activeButton;

    return (
        <div id={props.iden} className={'AbsPos ' + ((active) ? 'Timeline' : 'Timeline-Hidden') } style={props.style}
            onScroll={props.handleScroll}>
            {props.renderElements}
        </div>
    );
}

export default Timeline;