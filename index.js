var divId = document.getElementById("div1");
var videoContainerId;
var vidDimAdjusted = false;
var error = false;
var hasEnded = false;

/**
 * Selects the div in which media will load.
 * @param  {string} id id of selected div
*/
var selectDivId = (id) => {
    divId.innerHTML = "";
    divId = document.getElementById(id);
    vidDimAdjusted = false;
    load(`https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4`);
}

/**
 * Checks if video is already loaded. Called when a function is invoked without loading the video first. 
*/
var checkIfVideoIsLoaded = () => {
    if (document.getElementById("videoContainer") === null)
        load(`https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4`);
}

/**
 * Called when a video is loaded. The function set default values of various parameters.
*/
var mediaLoaded = () => {
    if (!vidDimAdjusted) {
        document.getElementById("vidHeight").value = videoContainerId.videoHeight;
        document.getElementById("vidWidth").value = videoContainerId.videoWidth;

        document.getElementById("playerHt").innerText = videoContainerId.videoHeight;
        document.getElementById("playerWd").innerText = videoContainerId.videoWidth;
    }
    document.getElementById("vidMute").innerText = videoContainerId.muted;
    document.getElementById("muteStatus").value = videoContainerId.muted;

    document.getElementById("vidVol").innerText = videoContainerId.volume * 100;
    document.getElementById("vidvolume").value = videoContainerId.volume * 100;

    document.getElementById("vidDuration").innerText = videoContainerId.duration;

    if (videoContainerId.paused)
        document.getElementById("playbackStatus").innerText = "Paused";
    else if (!videoContainerId.paused)
        document.getElementById("playbackStatus").innerText = "Playing";
}

/**
 * Loads the video into selected div.
 * @param  {string} url string path of an mp4 file
*/
var load = (url) => {
    //load element if not already loaded;
    if (!document.getElementById("videoContainer") && !error) {
        divId.innerHTML = `<video id="videoContainer" controls onplay="videoPlaying()" onpause="videoPaused()" onended="videoEnded()" onloadeddata="mediaLoaded()">
                                <source src=`+ url + ` type="video/mp4" onerror="handleError()"/>
                           </video`;

        videoContainerId = document.getElementById("videoContainer");
        videoContainerId.setAttribute("autoplay", true);
        videoContainerId.muted = false;
    }
    error = false;
}

/**
 * Plays the playback
*/
var play = () => {
    checkIfVideoIsLoaded();
    videoContainerId.play();
}

/**
 * Pauses the playback
*/
var pause = () => {
    checkIfVideoIsLoaded();
    videoContainerId.pause();
}

/**
 * change the player’s size.
*/
var resize = (element, param) => {
    vidDimAdjusted = true;
    checkIfVideoIsLoaded();

    videoContainerId.setAttribute(param, element.value);

    document.getElementById("playerHt").innerText = document.getElementById("vidHeight").value;
    document.getElementById("playerWd").innerText = document.getElementById("vidWidth").value;

}

/**
 * returns the player’s height.
*/
var getHeight = () => {
    checkIfVideoIsLoaded();

    document.getElementById("playerHt").innerText = document.getElementById("vidHeight").value;
}

/**
 * returns the player’s width.
*/
var getWidth = () => {
    checkIfVideoIsLoaded();

    document.getElementById("playerWd").innerText = document.getElementById("vidWidth").value;
}

/**
 * Indicate whether or not the player should autostart.
 * @param  {boolean} autoplay flag indicating if autoplay is true or false
*/
var setAutoplay = (autoplay) => {
    checkIfVideoIsLoaded();

    if (!autoplay)
        videoContainerId.setAttribute("autoplay", true);
    else
        videoContainerId.removeAttribute("autoplay");
}

/**
 * Set percentage of audible volume.
 * @param  {number} volume volume of video
*/
var setVolume = (volume) => {
    checkIfVideoIsLoaded();
    if (volume > 100) {
        volume = 100;
    }
    videoContainerId.volume = volume / 100;

    document.getElementById("vidvolume").value = videoContainerId.volume * 100;
    document.getElementById("vidVol").innerText = videoContainerId.volume * 100;

    if (videoContainerId.muted)
        setMute("false");

    if (volume == 0)
        setMute("true");
}

/**
 * returns the player’s current volume.
*/
var getVolume = () => {
    checkIfVideoIsLoaded();

    document.getElementById("vidVol").innerText = videoContainerId.volume * 100;
    document.getElementById("vidvolume").value = videoContainerId.volume * 100;
}

/**
 * Indicate whether or not the player should be muted.
 * @param  {boolean} mute flag indicating if mute is true or false
*/
var setMute = (mute) => {
    checkIfVideoIsLoaded();

    if (mute === "true")
        videoContainerId.muted = true;
    else {
        videoContainerId.muted = false;
    }

    document.getElementById("vidMute").innerText = mute;
    document.getElementById("muteStatus").value = mute;
}

/**
 * returns a boolean indicating whether or not the player is muted.
*/
var getMute = () => {
    checkIfVideoIsLoaded();

    document.getElementById("vidMute").innerText = videoContainerId.muted;
    document.getElementById("muteStatus").value = videoContainerId.muted;
}

/**
 * returns an integer indicating the duration of the media in seconds.
*/
var getDuration = () => {
    checkIfVideoIsLoaded();

    document.getElementById("vidDuration").innerText = videoContainerId.duration;
}

/**
 * indicates whether or not the player should occupy the entire area of the screen.
 * @param  {boolean} fullscreen flag indicating if fullscreen is true or false
*/
var setFullscreen = (fullscreen) => {
    checkIfVideoIsLoaded();

    if (videoContainerId.requestFullscreen) {
        videoContainerId.requestFullscreen();
    } else if (videoContainerId.mozRequestFullScreen) {
        videoContainerId.mozRequestFullScreen();
    } else if (videoContainerId.webkitRequestFullscreen) {
        videoContainerId.webkitRequestFullscreen();
    } else if (videoContainerId.msRequestFullscreen) {
        videoContainerId.msRequestFullscreen();
    } else {
        videoContainerId.classList.toggle('fullscreen');
    }

}

/**
 * indicates the player’s current playback state.
*/
var getPlaybackState = () => {
    checkIfVideoIsLoaded();

    if (videoContainerId.paused && !hasEnded)
        document.getElementById("playbackStatus").innerText = "Paused";
    else if (!videoContainerId.paused)
        document.getElementById("playbackStatus").innerText = "Playing";
}


// var getViewability = () => {
//     checkIfVideoIsLoaded();
// }

/**
 * alert on video load error.
*/
var handleError = () => {
    error = true;

    alert('Please check Internet Connectivity before proceeding!!');
}

/**
 * indicates if the player’s current playback state is "playing".
*/
var videoPlaying = () => {
    hasEnded = false;
    getPlaybackState();
}

/**
 * indicates if the player’s current playback state is "paused".
*/
var videoPaused = () => {
    hasEnded = false;
    getPlaybackState();
}

/**
 * indicates if the player’s current playback state is "Ended".
*/
var videoEnded = () => {
    getPlaybackState();
    hasEnded = true;
    document.getElementById("playbackStatus").innerText = "Ended";
}