import {useState} from "react";

function TimelineElement(props) {
    const [activeVal, setActiveVal] = useState(false);
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
            
        }
    }

    return (
        <div className="AbsPos TimelineElement" style={props.style} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="TopLeft ImageContainer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mitch_McConnell_2016_official_photo_%28cropped%29.jpg/1200px-Mitch_McConnell_2016_official_photo_%28cropped%29.jpg" className="AbsPos Image"/>
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
                <div className={"AbsPos IconsGeneral Hidden" + ((activeVal || props.starred) ? " Visible" : " Hidden")} style={{left: "88%"}}>
                    &#9733; 
                </div>
                <div className={"AbsPos IconsGeneral Hidden" + ((activeVal) ? " Visible" : " Hidden")} style={{left: "94%"}}>
                    &#x1F5D1;
                </div>
            </div>
            <div id={"commentContainer" + String(props.uuid)} className="AbsPos CommentContainer">
                <div className={"AbsPos IconsGeneral Hidden" + ((activeVal) ? " Visible" : " Hidden")} 
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