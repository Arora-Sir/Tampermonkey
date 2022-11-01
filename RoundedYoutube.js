// ==UserScript==
// @name         Rounded Youtube
// @namespace    https://github.com/Arora-Sir
// @license      MIT
// @version      0.2
// @description  Round the Youtube video watch screen
// @author       Mohit Arora
// @match        https://www.youtube.com/*
// @icon         https://www.svgrepo.com/show/92784/youtube.svg
// @updateURL    https://github.com/Arora-Sir/Tampermonkey/blob/main/RoundedYoutube.js
// @downloadURL  https://github.com/Arora-Sir/Tampermonkey/blob/main/RoundedYoutube.js
// @grant        none
// ==/UserScript==

//greasyfork Install Link: https://greasyfork.org/en/scripts/454081-rounded-youtube

(function() {
    'use strict';
    var OuterVideoPlayer = document.querySelector(".html5-video-player");
    OuterVideoPlayer.style.borderRadius = "15px";

    document.addEventListener("keydown", FKeyPressed, false);
    function FKeyPressed(f) {
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
