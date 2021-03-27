import React, { useState } from 'react'

export default function TrackerButton({isTracking, text, isUp, leftClicked, rightClicked}) {
    return(
        <div className={`trackerButton ${isTracking ? 'active' : 'inactive'}`}>
            <button style={{height: '32px'}} className="trackerButtonLeft" onClick={leftClicked}>{text}</button>
            <button style={{width: '32px', height: '32px'}} className="trackerButtonRight" onClick={rightClicked}>
                <span class="material-icons">{isUp ? "keyboard_arrow_up" : "keyboard_arrow_down"}</span>
                {/* {isUp ? "up" : "down"} */}
            </button>
        </div>
    )
}