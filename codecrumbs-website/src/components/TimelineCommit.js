function TimelineCommit(props) {

    return (
        <div>
            <div id={"timelineCommitContainer" + String(props.uuid)} className="AbsPos1 TimelineElement1" style={props.style}>
                <div className="TopLeft1 ImageContainer1">
                    <img src="http://pngimg.com/uploads/github/github_PNG40.png" className="AbsPos1 Image1"/>
                </div>
                <div className="TopLeft1 ContentContainer1">
                    <div className="AbsPos1 ContentGeneral1 ContentUrl1">
                        {props.commitName}
                    </div>
                    <div className="AbsPos1 ContentGeneral1 ContentTime1">
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