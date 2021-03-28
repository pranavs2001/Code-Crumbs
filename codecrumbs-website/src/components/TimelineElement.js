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
            console.log("Hello");
        } else {
            if(commentsOpened) {
                document.getElementById("commentIcon" + String(props.uuid)).innerHTML = "&#8853;";
                props.handleCloseComments(document.getElementById("timelineContainer" + String(props.uuid)));
                setCommentsOpened(false);
            } else {
                document.getElementById("commentIcon" + String(props.uuid)).innerHTML = "&#9447;";
                props.handleOpenComments(document.getElementById("timelineContainer" + String(props.uuid)));
                setCommentsOpened(true);
            }
        }
    }

    const starClicked = () => {
        props.starClicked(props.searchId, props.associatedProjectName, props.associatedUserId, props.starred, props.uuid);
    }

    const deleteClicked = () => {
        props.deleteClicked(props.searchId, props.associatedProjectName, props.associatedUserId);
    }

    return (
        <div id={"timelineContainer" + String(props.uuid)} className="AbsPos TimelineElement" style={props.style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="TopLeft ImageContainer">
                <img src={props.imageUrl} className="AbsPos Image"/>
            </div>
            <div className="TopLeft ContentContainer">
                <div className="AbsPos ContentGeneral ContentName">
                    {props.name}
                </div>
                <div className="AbsPos ContentGeneral ContentUrl">
                    {props.url}
                </div>
                <div className="AbsPos ContentGeneral ContentTime">
                    {props.time}
                </div>
                <div className={"AbsPos IconsGeneral Hidden" + ((activeVal || props.starred) ? " Visible" : " Hidden")} style={{left: "88%"}}
                    onClick={starClicked}>
                    &#9733; 
                </div>
                <div className={"AbsPos IconsGeneral Hidden" + ((activeVal) ? " Visible" : " Hidden")} style={{left: "94%"}}
                    onClick={deleteClicked}>
                    &#x1F5D1;
                </div>
            </div>
            <div id={"commentContainer" + String(props.uuid)} className="AbsPos CommentContainer">
                <div id={"commentIcon" + String(props.uuid)} className={"AbsPos IconsGeneral Hidden" + ((activeVal) ? " Visible" : " Hidden")} 
                    style={{left: "94%", top: "0vh", height: "4vh"}}
                    onClick={commentClicked}>
                    &#8853;
                </div>
                <input id={"commentField" + String(props.uuid)} type="text" className="AbsPos CommentInput" placeholder="Add a comment" />
            </div>
        </div>
    );
}

export default TimelineElement;