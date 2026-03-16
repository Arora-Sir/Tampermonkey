// ==UserScript==
// @name         Youtube Enhancements
// @namespace    https://github.com/Arora-Sir
// @version      3.0
// @license      MIT
// @description  Youtube UI Enhancer (adds views/date beside title, compact player buttons, improves description readability, adjusts layout spacing, and applies rounded corners to the video player).
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

(function () {
  "use strict";

  // Configuration for Easy Tweaking
  const INFO_FONT_SIZE_PX = 20;
  const INFO_GAP_PX = 20;
  const PLAYER_BORDER_RADIUS_PX = 15;
  const CONTROL_BUTTON_WIDTH_PX = 45;

  // Lightweight helpers
  function debounce(fn, ms = 80) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), ms);
    };
  }

  function applyCustomStyles() {
    if (document.getElementById("yt-enhance-style-simple")) return;

    const styleElement = document.createElement("style");
    styleElement.id = "yt-enhance-style-simple";

    styleElement.textContent = `
            /* //! Feature 1: Watch Video Bottom Buttons size decreases to show more buttons at a time */
            .ytp-chrome-controls .ytp-button:not(.ytp-chapter-title), .ytp-replay-button {
                width: ${CONTROL_BUTTON_WIDTH_PX}px !important;
                padding: 0 !important;
            }
            .ytp-efyt-button, #efyt-controls-button {
                min-width: ${CONTROL_BUTTON_WIDTH_PX}px !important;
            }
            .ytp-chapter-title {
                width: auto !important;
                max-width: none !important;
            }

            /* //! Feature 3: Align Discription Elements Properly */
            #above-the-fold { margin-top: 0px !important; }
            #top-row { margin-top: -2px !important; }

            /* //! Feature 4.2 & 4.3.3: Increase Info Tab Description text size */
            #description-inline-expander, #description-inline-expander span, #description-inline-expander yt-formatted-string {
                font-size: 18px !important;
                line-height: 1.6 !important;
            }

            /* //! Feature 4.3.5: Change VIews & Date Color, and then Add these two with Title (Visual Layout) */
            #title.ytd-watch-metadata {
                display: flex !important;
                align-items: center !important;
            }
            #title.ytd-watch-metadata h1 {
                flex: 1 1 auto !important;
                min-width: 0 !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                font-size: 20px !important;
                margin: 0 !important;
            }
            .yt-enhanced-info {
                flex: 0 0 auto !important;
                margin-left: ${INFO_GAP_PX}px !important;
                text-align: right !important;
                font-size: ${INFO_FONT_SIZE_PX}px !important;
                font-weight: 600 !important;
                white-space: nowrap !important;
                pointer-events: none !important;
                user-select: none !important;
                opacity: 0.98;
            }
            /* Views -> Green color */
            .yt-enhanced-info .yt-views { color: #4CAF50 !important; margin-right: 6px !important; }
            /* Date Uploaded -> Blue color */
            .yt-enhanced-info .yt-date { color: #2196F3 !important; }
            .yt-enhanced-info[aria-hidden="true"] { outline: none !important; }
        `;
    document.head.appendChild(styleElement);
  }

  //! Feature 4: Info Tab needful changes (Helper functions to extract data)
  function findInfoElement() {
    const selectors = [
      "ytd-watch-info-text #info",
      "#ytd-watch-info-text #info",
      ".ytd-watch-info-text #info",
      "#ytd-watch-info-text",
      "ytd-watch-info-text",
      "#info",
    ];
    for (const s of selectors) {
      const el = document.querySelector(s);
      if (el) return el;
    }
    return null;
  }

  function findWatchTitleContainer() {
    const candidates = document.querySelectorAll("#title");
    for (const c of candidates) {
      if (c.closest && (c.closest("ytd-watch-metadata") || c.closest("#above-the-fold"))) {
        return c;
      }
    }
    return document.querySelector("#title");
  }

  function extractViewsDate(infoEl) {
    if (!infoEl) return { views: "", date: "" };
    try {
      const spans = Array.from(infoEl.querySelectorAll("span"))
        .map((s) => s.innerText.trim())
        .filter(Boolean);
      if (spans.length >= 1) {
        const views = spans[0] || "";
        const dateCandidate =
          spans.find((s) => /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\bago\b|years?|months?|days?)\b/i.test(s)) ||
          spans[spans.length - 1] ||
          "";
        return { views, date: dateCandidate };
      }
    } catch (e) {}

    const txt = (infoEl.innerText || "").replace(/\n+/g, " ").trim();
    const viewsMatch = txt.match(/[\d,.\s]+views/i);
    const dateMatch =
      txt.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[^\d]{0,3}\s*\d{1,2}(?:,?\s*\d{4})?/) ||
      txt.match(/\b\d+\s+(?:years?|months?|days?)\s+ago/i);

    return { views: viewsMatch ? viewsMatch[0].trim() : "", date: dateMatch ? dateMatch[0].trim() : "" };
  }

  //! Feature 4.3.5: Change VIews & Date Color, and then Add these two with Title
  const refreshEnhancedInfo = debounce(() => {
    try {
      const titleContainer = findWatchTitleContainer();
      const infoEl = findInfoElement();
      if (!titleContainer || !infoEl) return;

      const { views, date } = extractViewsDate(infoEl);
      if (!views && !date) return;

      let enhanced = titleContainer.querySelector(".yt-enhanced-info");

      //! Feature 4.3.5.2: Show Views & Date of Upload at right side of the Title
      if (!enhanced) {
        enhanced = document.createElement("div");
        enhanced.className = "yt-enhanced-info";
        enhanced.setAttribute("aria-hidden", "true");

        const sViews = document.createElement("span");
        sViews.className = "yt-views";
        const sSep = document.createElement("span");
        sSep.textContent = "";
        const sDate = document.createElement("span");
        sDate.className = "yt-date";

        sViews.textContent = views || "";
        sDate.textContent = date || "";

        enhanced.appendChild(sViews);
        enhanced.appendChild(sSep);
        enhanced.appendChild(sDate);

        const h1 = titleContainer.querySelector("h1");
        if (h1 && h1.parentNode === titleContainer) {
          if (h1.nextSibling) titleContainer.insertBefore(enhanced, h1.nextSibling);
          else titleContainer.appendChild(enhanced);
        } else {
          titleContainer.appendChild(enhanced);
        }
      } else {
        const sViews = enhanced.querySelector(".yt-views");
        const sDate = enhanced.querySelector(".yt-date");
        if (sViews) sViews.textContent = views || "";
        if (sDate) sDate.textContent = date || "";
      }

      //Todo: (SUPER YOUTUBE EXTENSION) :: REMOVE THIS FUNTIONALITY IF NOT USING SUPER YOUTUBE EXTENSION!
      /*
            //! Feature 4.1: Disable scrolling on Watch video page
            if (window.location.href.includes("https://www.youtube.com/watch")) {
                document.body.style.overflow = "hidden";
            }
            
            //! Feature 4.3: Remove Monica Extension from Youtube to set margins!!
            let monicaVideoSummary = document.getElementById("monica-video-summary");
            if (monicaVideoSummary) monicaVideoSummary.remove();

            //! Feature 4.3.4 & Feature 2: Remove Hashtags
            document.querySelectorAll('a[href^="/hashtag/"]').forEach(element => {
                element.parentNode.removeChild(element);
            });
            */
    } catch (err) {}
  }, 90);

  // Dynamic Listeners for Info Tab (Replaces the old setInterval waitForInfoTab)
  let infoObserver = null;
  let titleObserver = null;
  function attachObservers() {
    try {
      const infoEl = findInfoElement();
      if (infoEl) {
        if (infoObserver) infoObserver.disconnect();
        infoObserver = new MutationObserver(() => refreshEnhancedInfo());
        infoObserver.observe(infoEl, { childList: true, subtree: true, characterData: true });
      }
    } catch (e) {}

    try {
      const titleContainer = findWatchTitleContainer();
      if (titleContainer) {
        if (titleObserver) titleObserver.disconnect();
        titleObserver = new MutationObserver(() => refreshEnhancedInfo());
        titleObserver.observe(titleContainer, { childList: true, subtree: true, characterData: true });
      }
    } catch (e) {}
  }

  //! Feature 5: Round Corners Watch Video
  function setYTRoundCorners() {
    let checkForRoundYT_TimerCheck = setInterval(() => {
      let OuterVideoPlayer = document.querySelector(".html5-video-player") || document.querySelector("#container.ytd-player > div");
      if (!OuterVideoPlayer) return;

      OuterVideoPlayer.style.borderRadius = PLAYER_BORDER_RADIUS_PX + "px"; //Initial State

      document.addEventListener(
        "fullscreenchange",
        function () {
          if (document.fullscreenElement) {
            OuterVideoPlayer.style.borderRadius = "0px";
          } else {
            OuterVideoPlayer.style.borderRadius = PLAYER_BORDER_RADIUS_PX + "px";
          }
        },
        true,
      );

      clearInterval(checkForRoundYT_TimerCheck);
    }, 120);
  }

  // Main Initialization Flow
  function setEventListeners() {
    applyCustomStyles();
    refreshEnhancedInfo();
    attachObservers();
    setYTRoundCorners();
  }

  setEventListeners();

  // Fallback Poller for YouTube's Dynamic Page Loads
  const poller = setInterval(() => {
    if (document.querySelector("#above-the-fold") || document.querySelector("#title")) {
      setEventListeners();
      clearInterval(poller);
    } else {
      applyCustomStyles(); // Keep ensuring CSS is there
    }
  }, 350);

  window.addEventListener(
    "yt-navigate-finish",
    () => {
      setTimeout(() => {
        setEventListeners();
      }, 220);
    },
    true,
  );
})();
