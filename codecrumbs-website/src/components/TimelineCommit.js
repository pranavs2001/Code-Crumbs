function TimelineCommit(props) {

    return (
        <div>
            <div id={"timelineCommitContainer" + String(props.uuid)} className="AbsPos TimelineElement" style={props.style}>
                <div className="TopLeft ImageContainer">
                    <img src="http://pngimg.com/uploads/github/github_PNG40.png" className="AbsPos Image"/>
                </div>
                <div className="TopLeft ContentContainer">
                    <div className="AbsPos ContentGeneral ContentUrl">
                        {props.commitName}
                    </div>
                    <div className="AbsPos ContentGeneral ContentTime">
                        {props.date}
                    </div>
                </div>
            </div>
            <div style={{position: "absolute", top: props.top, left: "5%", width:"10%", height:"0.25%", backgroundColor:"gray"}}></div>
            <div style={{position: "absolute", backgroundColor:"gray", top:props.top, left:"5%", width:"0.5%", height:"12%"}}></div>
        </div>
    );
}

export default TimelineCommit;