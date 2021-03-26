import TimelineElement from './TimelineElement.js'

function Timeline(props) {
    const active = props.activeButton;
    const searches = [];

    const renderElements = [];
    var initTop = 3;
    for(const [index, value] of searches.entries()) {
        renderElements.push(<TimelineElement key={index} style={{top: String(initTop) + "%"}}></TimelineElement>);
        initTop += 20;
    }

    return (
        <div className={'AbsPos ' + ((active) ? 'Timeline' : 'Timeline-Hidden') } style={props.style}>
            {renderElements}
        </div>
    );
}

export default Timeline;