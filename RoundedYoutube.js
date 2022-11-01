// ==UserScript==
// @name         Rounded Youtube
// @namespace    https://github.com/Arora-Sir
// @version      0.32
// @license      MIT
// @description  round the Youtube video screen
// @author       Mohit Arora
// @match        https://www.youtube.com/watch*
// @icon         https://www.svgrepo.com/show/92784/youtube.svg
// @updateURL    https://github.com/Arora-Sir/Tampermonkey/blob/main/RoundedYoutube.js
// @downloadURL  https://github.com/Arora-Sir/Tampermonkey/blob/main/RoundedYoutube.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var OuterVideoPlayer = document.querySelector(".html5-video-player");
    
    if(OuterVideoPlayer!=null){
        OuterVideoPlayer.style.borderRadius = "15px";
//             console.log('Not Null');
    }
    else{
        while (OuterVideoPlayer.style.borderRadius != "15px"){
            OuterVideoPlayer.style.borderRadius = "15px";
//             console.log('Null');
        };
    }

    document.addEventListener("keydown", checkKeyPressed, false);
    function checkKeyPressed(f) {
        if(OuterVideoPlayer.style.borderRadius == "0px"){
             OuterVideoPlayer.style.borderRadius = "15px";
        }
        else{
            OuterVideoPlayer.style.borderRadius == "0px"
        }
    }
   // const FullScreenButton = document.getElementsByClassName("ytp-fullscreen-button");
   // FullScreenButton.addEventListener('click', function handleClick() {
   //    console.log('element clicked');
   //         document.querySelector(".html5-video-player").style.borderRadius = "500px";
   // });
})();
