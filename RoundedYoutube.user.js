// ==UserScript==
// @name         Rounded Youtube
// @namespace    https://github.com/Arora-Sir
// @version      0.5
// @license      MIT
// @description  Round the Youtube watch video screen
// @author       Mohit Arora
// @match        https://www.youtube.com/watch*
// @icon         https://www.svgrepo.com/show/92784/youtube.svg
// @updateURL    https://github.com/Arora-Sir/Tampermonkey/raw/main/RoundedYoutube.user.js
// @downloadURL  https://github.com/Arora-Sir/Tampermonkey/raw/main/RoundedYoutube.user.js
// @supportURL   https://github.com/Arora-Sir/Tampermonkey/issues
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    let OuterVideoPlayer = document.querySelector(".html5-video-player");
    OuterVideoPlayer.style.borderRadius = "15px";

    window.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            //console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
            OuterVideoPlayer.style.borderRadius = "0px";
        } else {
            //console.log('Leaving fullscreen mode.');
            OuterVideoPlayer.style.borderRadius = "15px";
        }
    }, true);


    //Old Method Limitations: (Double click listner not added, not work sometimes!)
    /*
    let OuterVideoPlayer = document.querySelector(".html5-video-player");
    let FullScreenButton = document.querySelector('[title="Full screen (f)"]');

    // Removed the code as now script run at document end
    //     if(OuterVideoPlayer!=null){
    OuterVideoPlayer.style.borderRadius = "15px";
    //     }
    //     else{
    //         while (OuterVideoPlayer.style.borderRadius != "15px"){
    //             OuterVideoPlayer.style.borderRadius = "15px";
    //         };
    //     }

    //When F is preessed or Left clicked on Full Screen Button
    document.addEventListener("keydown", ButtonOrF_Pressed, false);
    FullScreenButton.addEventListener("click", ButtonOrF_Pressed, false);

    function ButtonOrF_Pressed(f) {
        if(f.code == "KeyF" || event.button==0){
            if(OuterVideoPlayer.style.borderRadius == "0px"){
                OuterVideoPlayer.style.borderRadius = "15px";
            }
            else{
                OuterVideoPlayer.style.borderRadius = "0px"
            }
        }
    }
*/

})();
