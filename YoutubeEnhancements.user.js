// ==UserScript==
// @name         Youtube Enhancements
// @namespace    https://github.com/Arora-Sir
// @version      2.0
// @license      MIT
// @description  Youtube (Remove HashTags, Button Size, Margin Set, Color Elements, Remove Scrollbar, Round Corners Watch Video)
// @author       Mohit Arora
// @match        *://*.youtube.com/*
// @exclude      *://music.youtube.com/*
// @exclude      *://*.music.youtube.com/*
// @icon
// @updateURL    https://github.com/Arora-Sir/Tampermonkey/raw/main/YoutubeEnhancements.user.js
// @downloadURL  https://github.com/Arora-Sir/Tampermonkey/raw/main/YoutubeEnhancements.user.js
// @supportURL   https://github.com/Arora-Sir/Tampermonkey/issues
// @grant        none
// @run-at       document-start
// ==/UserScript==

function setEventListeners(evt) {
  let initializationCheckTimer;
  let infoTabWait;

  //! Feature 1: Watch Video Bottom Buttons size decreases to show more buttons at a time
  function applyCustomStyles() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
            .ytp-chrome-controls .ytp-button, .ytp-replay-button {
                width: 45px;
                padding: 0;
            }
            .ytp-efyt-button, #efyt-controls-button {
                min-width: 45px;
            }
        `;
    document.head.appendChild(styleElement);
  }

  function checkForJS_Initialization() {
    try {
      //! Feature 1: Video Bottom Buttons size decreases to show more buttons at a time
      // Check for the presence of video controls to apply custom styles
      if (document.querySelector(".ytp-chrome-controls")) {
        applyCustomStyles();
      }

      //! Feature 2: Remove Hashtags
      let hashTags = document.querySelectorAll(".yt-simple-endpoint.bold.style-scope.yt-formatted-string");
      for (let i = 0; i < hashTags.length; i++) {
        let hashTag = hashTags[i];
        hashTag.parentNode.removeChild(hashTag);
      }

      //! Feature 3: Align Discription Elements Properly
      document.getElementById("bottom-row").style.marginTop = "-10px";
      document.getElementById("description-inner").style.margin = "10px 0px";

      //! Feature 4: Info Tab needful changes
      infoTabWait = setInterval(waitForInfoTabToAppear, 50);

      clearInterval(initializationCheckTimer);
    } catch (error) {
      //console.log("[Remove_YT_Hashtags]: " + error.message);
      return;
    }
  }

  //! Feature 4: Info Tab needful changes
  function waitForInfoTabToAppear() {
    //Todo: (SUPER YOUTUBE EXTENSION) :: REMOVE THIS FUNTIONALITY IF NOT USING SUPER YOUTUBE EXTENSION!
    //! Feature 4.1: Disable scrolling on Watch video page (As everything is in single view because of Super Youtube Extension, scrolling is unncessary)
    if (window.location.href.includes("https://www.youtube.com/watch")) {
      document.body.style.overflow = "hidden";
    }

    //! Feature 4.2: Increase Views & Years Ago Text Size to see it clearly
    //Cut Info from bottom to right side of tab
    let ViewsText = document.querySelectorAll(".style-scope.ytd-watch-info-text");
    for (let i = 0; i < ViewsText.length; i++) {
      ViewsText[i].style.fontSize = "17px";
    }

    //! Feature 4.3: Remove Monica Extension from Youtube to set margins!!
    let monicaVideoSummary = document.getElementById("monica-video-summary");
    if (monicaVideoSummary) {
      monicaVideoSummary.remove();
    }

    //Todo: (SUPER YOUTUBE EXTENSION) :: REMOVE THIS FUNTIONALITY IF NOT USING SUPER YOUTUBE EXTENSION!
    //!Feature 4.3: Margin Corrections for Super Youtube Extension
    let tabInfo = document.getElementById("tab-info");
    let descriptionInlineExpander = document.getElementById("description-inline-expander");

    if (descriptionInlineExpander && tabInfo) {
      //! Feature 4.3.1 : Margin Corrections for Super Youtube Extension
      tabInfo.style.margin = "10px"; //Info,Comment & Video Margin corrections
      tabInfo.style.marginBottom = "auto"; //Info,Comment & Video Margin corrections
      let tabComments = document.getElementById("tab-comments");
      let tabVideos = document.getElementById("tab-videos");
      if (tabComments && tabVideos) {
        tabComments.style.margin = "-40px 10px"; //Comment,Videos Margin corrections
        tabVideos.style.margin = "60px 10px"; //Videos Margin corrections
      }

      //! Feature 4.3.2: Info Tab Description Margin LEFT , RIGHT & BOTTOM Set
      descriptionInlineExpander.style.paddingTop = "10px";
      let descriptionInner = document.getElementById("description-inner");
      if (descriptionInner) {
        let currentMarginLeft = descriptionInner.style.marginLeft; // Get the current left margin
        let currentMarginLeftValue = parseInt(currentMarginLeft, 10); // Convert the current margin to a number (assuming it's in pixels)
        let additionalMarginLeft = 2; // Define how much you want to shift to the right, e.g., 10 pixels
        descriptionInner.style.marginLeft = currentMarginLeftValue + additionalMarginLeft + "px"; // Set the new left margin

        let currentMarginRight = descriptionInner.style.marginRight; // Get the current right margin
        let currentMarginRightValue = parseInt(currentMarginRight, 10); // Convert the current margin to a number (assuming it's in pixels)
        let additionalMarginRight = 2; // Define how much you want to shift to the left, e.g., 10 pixels
        descriptionInner.style.marginRight = currentMarginRightValue + additionalMarginRight + "px"; // Set the new right margin
      }

      let bottomLinksAfterShowMore = document.querySelector("#description.ytd-structured-description-playlist-lockup-renderer");
      if (bottomLinksAfterShowMore) {
        bottomLinksAfterShowMore.style.marginBottom = "20px";
      }

      //! Feature 4.3.2: Remove Visible Scroller
      //tabInfo.style.scrollbarColor = 'transparent transparent'; // Transparent, but this will show only Scrollbar borders
      tabInfo.style.scrollbarWidth = "none"; //Completely Hide the Scrollbar
      tabComments.style.scrollbarWidth = "none";
      tabVideos.style.scrollbarWidth = "none";

      //! Feature 4.3.3: Increase Info Tab Description text size
      let InfoTextElements = document.querySelectorAll(".style-scope.ytd-text-inline-expander");
      for (let i = 0; i < InfoTextElements.length; i++) {
        InfoTextElements[i].style.fontSize = "16px";
      }

      /*
      // Now By Default happens in Super Youtube Extension.
      // Feature 4.3.2: Click more button by default & Expand
      let infoMoreButton = document.querySelector('tp-yt-paper-button[id="expand"][class="button style-scope ytd-text-inline-expander"][role="button"]');
      if (infoMoreButton) {
          infoMoreButton.click();
      }*/

      //! Feature 4.3.4: Remove Hashtags from Info Tab
      let hashTags = document.querySelectorAll(".yt-simple-endpoint.bold.style-scope.yt-formatted-string");
      for (let i = 0; i < hashTags.length; i++) {
        let hashTag = hashTags[i];
        hashTag.parentNode.removeChild(hashTag);
      }

      //! Feature 4.3.5: Change VIews & Date Color, and then Add these two with Title
      let views_date = document.querySelectorAll(".yt-formatted-string.bold");
      if (views_date.length >= 2) {
        //! Feature 4.3.5.1: Change Views & Date Color
        views_date[0].style.color = "#4CAF50"; // Views -> Green color
        views_date[2].style.color = "#2196F3"; // Date Uploaded -> Blue color
        views_date[0].style.fontSize = "22px";
        views_date[2].style.fontSize = "22px";
        views_date[0].textContent += ",";

        //! Feature 4.3.5.2: Show Views & Date of Upload at right side of the Title
        let el = document.querySelector("yt-formatted-string.style-scope.ytd-watch-metadata");
        el.style.display = "flex"; // Ensure the container is styled as a flexbox
        el.style.flexDirection = "row"; // Ensures the content flows in a line from left to right
        el.style.alignItems = "center";
        el.style.justifyContent = "center"; // Centers the content horizontally
        el.style.flexWrap = "nowrap"; // Prevents wrapping

        function appendText(container, text, color, isLastElement) {
          // Function to append text with specific color to an element
          let span = document.createElement("span");
          span.textContent = text;
          span.style.textAlign = "center"; // Centers the text inside the span

          if (!isLastElement) {
            //span.textContent += ",";
            span.style.marginRight = "8px";
          }

          span.style.color = color || "inherit"; // Inherits the color if not specified
          //span.style.marginLeft = 'auto'; // Centers the span horizontally
          container.appendChild(span);
          return span; // Return the span in case we need to reference it
        }

        // Create spans for the views/date text.
        let firstElement = appendText(el, views_date[0].textContent, views_date[0].style.color, false);
        firstElement.style.marginLeft = "auto"; // Pushes everything to the right of Title
        //appendText(el, "  ;  ", 'white');
        appendText(el, views_date[2].textContent, views_date[2].style.color, true);
      }

      clearInterval(infoTabWait);
    }
  }

  initializationCheckTimer = setInterval(checkForJS_Initialization, 500);
}

//! Feature 5: Video Bottom Buttons size decreases to show more buttons at a time
function setYTRoundCorners(evt) {
  let checkForRoundYT_TimerCheck;
  function checkForRoundYT() {
    try {
      let OuterVideoPlayer = document.querySelector(".html5-video-player") ?? document.querySelector("#container.ytd-player > div");
      OuterVideoPlayer.style.borderRadius = "15px"; //Initial State
      document.addEventListener(
        "fullscreenchange",
        function () {
          if (document.fullscreenElement) {
            //console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
            OuterVideoPlayer.style.borderRadius = "0px";
          } else {
            //console.log('Leaving fullscreen mode.');
            OuterVideoPlayer.style.borderRadius = "15px";
          }
        },
        true
      );
    } catch (error) {
      //console.log("[RoundedYoutube]: " + error.message);
      return;
    }
    clearInterval(checkForRoundYT_TimerCheck);
  }
  checkForRoundYT_TimerCheck = setInterval(checkForRoundYT, 100);
}

(function () {
  "use strict";
  setYTRoundCorners();
  window.addEventListener("yt-navigate-finish", setEventListeners, true);
})();
