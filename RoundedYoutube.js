// ==UserScript==
// @name         Rounded Youtube
// @namespace    https://github.com/Arora-Sir
// @version      0.1
// @description  round the Youtube video screen
// @author       Mohit Arora
// @match        https://www.youtube.com/*
// @icon         https://www.svgrepo.com/show/92784/youtube.svg
// @updateURL   
// @downloadURL 
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var OuterVideoPlayer = document.querySelector(".html5-video-player");
    OuterVideoPlayer.style.borderRadius = "15px";

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
