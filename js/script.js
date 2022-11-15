/* ------===== tying animation typed.js =====------- */
var typed = new Typed(".typing", {
    strings: ["Web developer", "Web designer", "And more.."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

/* ------===== theme light/dark mode toggle btn / prof pic change =====------- */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("light")

    profPic = document.getElementById("profile-pic")
    if (profPic.src.slice(-7) !== "me.webp") {
        profPic.src = "images/me.webp"
    } else
        profPic.src = "images/me2.webp"
})

/* ------===== theme light/dark toggle on DOM-load =====------- */
window.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-moon")
    } else {
        dayNight.querySelector("i").classList.add("fa-sun")

    }
})

/* ------===== theme colors alternating =====------- */
const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    })
}

/* ------=====  style switcher color toggle =====------- */
const colorBox = document.querySelector(".colors");
const colors = colorBox.querySelectorAll("span");
const colorList = colors.length;

for (let x = 0; x < colorList; x++) {
    const spn = colors[x]
    spn.addEventListener("click", () => {

        for (let y = 0; y < colorList; y++) {
            if (colors[y].classList.contains("active-color")) {
                colors[y].classList.remove("active-color")
            }
        }
        spn.classList.add("active-color")
    })
}

/* ---===== functions for add||remove open||active class for aside, btn, activeSection && <1200 =====--- */
const aside = document.querySelector(".aside");
const navTogglerBtn = document.querySelector(".nav-toggler");
const styleSwitcher = document.querySelector(".style-switcher");
const activeSection = document.querySelector("section.active")

function styleSwitcherCloseIfOpen() {
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open")
    }
}

/* ------=====  aside btn section < 1200 =====------- */
function asideNavAndBtnToggle() {
    if (window.innerWidth < 1200) {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
    }
}
function asideBtnOpen1200() {
    if (window.innerWidth < 1200) {
        aside.classList.add("open");
        navTogglerBtn.classList.add("open");
    }
}
function asideBtnClose1200() {
    if (window.innerWidth < 1200) {
        aside.classList.remove("open");
        navTogglerBtn.classList.remove("open");
    }
}
function addOpenClass1200() {
    const activeSection = document.querySelector("section.active")
    if (window.innerWidth < 1200) {
        activeSection.classList.add("open");
    }
}
function removeOpenClass1200() {
    const activeSection = document.querySelector("section.active")
    if (window.innerWidth < 1200) {
        activeSection.classList.remove("open");
    }
}
function activeSectionToggle1200() {
    const activeSection = document.querySelector("section.active")
    if (window.innerWidth < 1200) {
        activeSection.classList.toggle("open")
    }
}
/* ------===== check for backsectons in 600<x<1200 width devices =====------- */
/* ------===== if nav panel wasn`t open before clicking links it could =====------- */
/* ------===== remain visible if reopen aside panel and click nav-link =====------- */
function backSectionCheck1200() {
    if (600 < window.innerWidth && window.innerWidth < 1200 && aside.classList.contains("open")) {
        if (document.querySelector("section.projects").classList.contains("back-section")
            || document.querySelector("section.about").classList.contains("back-section")
            || document.querySelector("section.portfolio-example").classList.contains("back-section")) {

            document.querySelector("section.projects").classList.remove("back-section")
            document.querySelector("section.about").classList.remove("back-section")
            document.querySelector("section.portfolio-example").classList.remove("back-section")
        }
    }
}

/* ------=====  style switcher toggle btn =====------- */
const styleSwitcherToggler = document.querySelector(".style-toggler");

styleSwitcherToggler.addEventListener("click", () => {
    if (window.innerWidth < 1200 && aside.classList.contains("open")) {
        asideNavAndBtnToggle()
        activeSectionToggle1200()
        removeOpenClass1200()
        document.querySelector(".style-switcher").classList.toggle("open")
    } else {
        document.querySelector(".style-switcher").classList.toggle("open")
    }
})
/* ------===== toggle aside btn =====------- */
navTogglerBtn.addEventListener("click", () => {
    styleSwitcherCloseIfOpen()
    asideNavAndBtnToggle()
    activeSectionToggle1200()
    backSectionCheck1200()
    if (991 < window.innerWidth < 1200 && aside.classList.contains("open")) { 
        document.querySelector(".home-img").classList.add("hidden")
        document.querySelector(".home-info").classList.add("maxflex")
     } else {
        document.querySelector(".home-img").classList.remove("hidden")
        document.querySelector(".home-info").classList.remove("maxflex")
     }
})

/* ------===== hammer.js (swipes) =====------- */
const hammer = new Hammer(
    document.getElementById('gesture-element'),
    { inputClass: Hammer.TouchMouseInput }
);

hammer.on('swiperight', function () {
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open")
    } else {
        asideBtnOpen1200()
        addOpenClass1200()
        backSectionCheck1200()
        if (991 < window.innerWidth < 1200 && aside.classList.contains("open")) { 
           document.querySelector(".home-img").classList.add("hidden")
           document.querySelector(".home-info").classList.add("maxflex")
        }
    }
});

hammer.on('swipeleft', function () {
    if (aside.classList.contains("open")) {
        asideBtnClose1200()
        activeSectionToggle1200()
        if (991 < window.innerWidth < 1200 && !aside.classList.contains("open")) { 
            document.querySelector(".home-img").classList.remove("hidden")
            document.querySelector(".home-info").classList.remove("maxflex")
         }
    } else {
        styleSwitcher.classList.add("open")
    }
});

hammer.on('doubletap', function () {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("light")

    profPic = document.getElementById("profile-pic")
    if (profPic.src.slice(-7) !== "me.webp") {
        profPic.src = "images/me.webp"
    } else
        profPic.src = "images/me2.webp"
});

/* ------===== checking if back/forward button get pressed =====------- */
const navHistory = ["home", "home"]
const navPopHistory = ["home", "home"]

function navHistoryCheck() {
    if (navHistory.slice(-1).pop() != getId) {
        navHistory.push(getId)
    }
}

window.addEventListener('popstate', function () {
    const currentUrl = window.location.href
    const currentUrlId = currentUrl.split("#")[1]
    const navDifference = navHistory.length - navPopHistory.length
    const lastId = (navHistory[navHistory.length - 1]);
    const secondLastId = (navHistory[navHistory.length - 2]);

    if (navPopHistory.slice(-1).pop() != currentUrlId) {
        if (navDifference >= 0) {
            navPopHistory.push(currentUrlId)
        }
    }

    if (navHistory.length == 2 && navPopHistory.length == 3) {
        navPopHistory.pop()
    } else {
        if (navHistory.length != navPopHistory.length && navHistory.length > 2 && navDifference >= 0 && navPopHistory.length > 3) {
            lastSection = document.getElementById(secondLastId)
            currentSection = document.getElementById(lastId)

            // back-section remove/add //
            for (let j = 0; j < sLinksList; j++) {
                const s = sLinks[j]
                s.classList.remove("back-section")
            } currentSection.classList.add("back-section")

            // active section remove/add //
            for (let j = 0; j < sLinksList; j++) {
                const s = sLinks[j]
                s.classList.remove("active")
            } lastSection.classList.add("active")

            // active link remove/add //
            const hrefsecondLastId = "#" + secondLastId
            const getLink = document.querySelector("a[href='" + hrefsecondLastId + "']")
            if (!getLink.classList.contains("nope")) {
                for (let i = 0; i < aLinksList; i++) {
                    const a = aLinks[i]
                    a.classList.remove("active")
                    a.classList.remove("underline")
                } getLink.classList.add("active")
            }
            if (getLink.getAttribute("href") === "#andras") {
                getLink.classList.remove("active")
                getLink.classList.add("underline")
            }
            startStopLazy()
            asideBtnClose1200()
            removeOpenClass1200()
            styleSwitcherCloseIfOpen()
            navPopHistory.splice(navPopHistory.length - 2, 2)
            navHistory.pop()
            console.log("Backbutton pressed; History: " + navHistory);
        }
    }
})

/* ------===== show-hide sections =====------- */
const aLinks = document.querySelectorAll("a.a-link")
aLinksList = aLinks.length
const sLinks = document.querySelectorAll("section.s-link")
sLinksList = sLinks.length;

for (let i = 0; i < aLinksList; i++) {
    const a = aLinks[i]
    a.addEventListener("click", function () {
        //its removes blank as back section (for inital loading only)//
        document.querySelector("section.blank").classList.remove("back-section")

        getId = a.getAttribute("href").split("#")[1];
        getSection = document.getElementById(getId)
        currentSection = document.querySelector("section.active")

        // back-section remove/add //
        for (let j = 0; j < sLinksList; j++) {
            const s = sLinks[j]
            s.classList.remove("back-section")
        } currentSection.classList.add("back-section")

        // active section remove/add //
        for (let j = 0; j < sLinksList; j++) {
            const s = sLinks[j]
            s.classList.remove("active")
        } getSection.classList.add("active")

        // active link remove/add //
        if (!this.classList.contains("nope")) {
            for (let i = 0; i < aLinksList; i++) {
                const a = aLinks[i]
                a.classList.remove("active")
                a.classList.remove("underline")
            }
        } this.classList.add("active")
        if (this.getAttribute("href") === "#andras") {
            this.classList.remove("active")
            this.classList.add("underline")
        }

        startStopLazy()
        asideBtnClose1200()
        removeOpenClass1200()
        navHistoryCheck()
    })
}

/* ------===== nav-active overwrite for about/hire btn =====------- */
document.querySelector("a.hire-me").addEventListener("click", function () {
    const ulNav = document.querySelector("ul.nav");
    ulNav.lastElementChild.lastElementChild.classList.add("active")
})

/* ------===== start & stop lazy load youtube iframe =====------- */
function startStopLazy() {

    const activeSection = document.querySelector("section.active")
    const prevSection = document.querySelector("section.back-section")

    if (activeSection.classList.contains("portfolio-example") && activeSection.classList.contains("iframed")) {
        activeId = activeSection.id
        iframeId = activeId + "-iframe"
        setIframeGif()
        setTimeout(startLazy, 700)
        console.log("Iframe started");
    } else if (prevSection.classList.contains("portfolio-example")) {
        setTimeout(setIframeGif, 700)
        console.log("Iframe stopped");
    }

    function setIframeGif() {
        document.getElementById(iframeId).innerHTML = "<img src=images/loading.gif alt=loading-gif>"
        document.getElementById("iframehide").classList.add("opacity0")
        document.getElementById("iframehide").classList.add("hidden")
        document.getElementById("phide").classList.remove("hidden")
        document.getElementById("phide").classList.remove("opacity0")
    }

    function startLazy() {
        portfolio = "<iframe class=youtube, src=https://www.youtube.com/embed/PzofI5Zq97w allowfullscreen alt=portfolio> </iframe>"
        crud = "<iframe class=youtube, src=https://www.youtube.com/embed/xormCHYRooM allowfullscreen alt=crud> </iframe>"
        secrets = "<iframe class=youtube, src=https://www.youtube.com/embed/LWzz4yKfj4g allowfullscreen alt=secrets> </iframe>"
        todo = "<iframe class=youtube, src=https://codesandbox.io/embed/to-do-veyju?fontsize=14&hidenavigation=1&theme=dark alt=crud-project></iframe>"

        switch (iframeId) {
            case "portfolio-iframe":
                document.getElementById(iframeId).innerHTML = portfolio
                break;
            case "crud-iframe":
                document.getElementById(iframeId).innerHTML = crud
                break;
            case "secrets-iframe":
                document.getElementById(iframeId).innerHTML = secrets
                break;
            case "todo-iframe":
                document.getElementById("todo-iframe").innerHTML = todo
                break;
        }
    }
}

/* ------===== codesandbox-embed animations =====------- */
const toDoButton = document.getElementById("codesandbox")
toDoButton.addEventListener("click", () => {

    if (document.getElementById("iframehide").classList.contains("hidden")) {
        setOpacityButtonIn()
        setOpacityP()
        setTimeout(setHiddenP, 550)
        setHiddenIframe()
        setTimeout(setOpacityIframe, 600)
        setTimeout(setOpacityButtonOut, 630)
    } else {
        setOpacityIframe()
        setOpacityButtonIn()
        setTimeout(setHiddenIframe, 450)
        setTimeout(setHiddenP, 550)
        setTimeout(setOpacityP, 600)
        setTimeout(setOpacityButtonOut, 630)
    }

    function setOpacityP() {
        document.getElementById("phide").classList.toggle("opacity0")
        document.getElementById("phide").classList.toggle("opacity100")
    }
    function setHiddenP() {
        document.getElementById("phide").classList.toggle("hidden")
    }
    function setHiddenIframe() {
        document.getElementById("iframehide").classList.toggle("hidden")
    }
    function setOpacityIframe() {
        document.getElementById("iframehide").classList.toggle("opacity0")
        document.getElementById("iframehide").classList.toggle("opacity100")
    }
    function setOpacityButtonIn() {
        toDoButton.classList.add("hidden")
    }
    function setOpacityButtonOut() {
        toDoButton.classList.remove("hidden")
    }
})

/* ------===== performance check in console =====------- */
addEventListener('DOMContentLoaded', (event) => {
    DOMContentLoaded = event.timeStamp / 1000;
    DOMContentLoadedStr = String(DOMContentLoaded).slice(0, 5);
    console.log("DOM Content Loaded in " + DOMContentLoadedStr + "s " + "(HTML)");
})

window.addEventListener('load', (event) => {
    loadTime = (Date.now() - window.performance.timing.navigationStart) / 1000;
    console.log('All assets are loaded in ' + (loadTime) + "s " + "(CSS, JS)");
});