import {useState} from "react";

function TimelineElement(props) {
    const [activeVal, setActiveVal] = useState(false);
    const [commentsOpened, setCommentsOpened] = useState(false);
    const mouseEnter = () => {
        setActiveVal(true);
    }

    const mouseLeave = () => {
        setActiveVal(false);
    }

    const commentClicked = () => {
        var commentText = document.getElementById("commentField" + String(props.uuid)).value;
        if(commentText.trim() != "") {
            props.addComment(props.searchId, props.associatedProjectName, props.associatedUserId, commentText);
        } else {
            alert("Comment is empty");
        }
    }

    const starClicked = () => {
        props.starClicked(props.searchId, props.associatedProjectName, props.associatedUserId, props.starred);
    }

    const deleteClicked = () => {
        props.deleteClicked(props.searchId, props.associatedProjectName, props.associatedUserId);
    }

    return (
        <div id={"timelineContainer" + String(props.uuid)} className="AbsPos1 TimelineElement1" style={props.style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="TopLeft1 ImageContainer1">
                <img src={props.imageUrl} className="AbsPos1 Image1"/>
            </div>
            <div className="TopLeft1 ContentContainer1">
                <div className="AbsPos1 ContentGeneral1 ContentName1">
                    {props.name}
                </div>
                <div className="AbsPos1 ContentGeneral1 ContentUrl1">
                    {props.url}
                </div>
                <div className="AbsPos1 ContentGeneral1 ContentTime1">
                    {props.time}
                </div>
                <div className={"AbsPos1 IconsGeneral1 Hidden1" + ((activeVal || props.starred) ? " Visible1" : " Hidden1")} style={{left: "88%"}}
                    onClick={starClicked}>
                    &#9733; 
                </div>
                <div className={"AbsPos1 IconsGeneral1 Hidden1" + ((activeVal) ? " Visible1" : " Hidden1")} style={{left: "94%"}}
                    onClick={deleteClicked}>
                    &#x1F5D1;
                </div>
            </div>
            <div id={"commentContainer" + String(props.uuid)} className="AbsPos1 CommentContainer1">
                <div id={"commentIcon" + String(props.uuid)} className={"AbsPos1 IconsGeneral1 Hidden1" + ((activeVal) ? " Visible1" : " Hidden1")} 
                    style={{left: "94%", top: "0vh", height: "4vh"}}
                    onClick={commentClicked}>
                    &#8853;
                </div>
                <input id={"commentField" + String(props.uuid)} type="text" className="AbsPos1 CommentInput1" placeholder="Add a comment" />
            </div>
        </div>
    );
}

export default TimelineElement;