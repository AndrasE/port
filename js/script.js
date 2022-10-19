/* ------===== tying animation typed.js =====------- */
var typed = new Typed(".typing", {
    strings: ["Web developer", "Web designer", "And more.."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

/* ------===== theme light/dark mode toggle btn =====------- */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("light")
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
function asideNavAndBtnToggle() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
}
/* ------=====  aside btn section < 1200 =====------- */
function asideNavAndBtnToggle() {
    if (window.innerWidth < 1200) {
        aside.classList.add("open");
        navTogglerBtn.classList.add("open");
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
    }
});

hammer.on('swipeleft', function () {
    if (aside.classList.contains("open")) {
        asideBtnClose1200()
        activeSectionToggle1200()
    } else {
        styleSwitcher.classList.add("open")
    }
});

hammer.on('doubletap', function () {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("light")
});

/* ------===== show-hide sections =====------- */
const aLinks = document.querySelectorAll("a.a-link")
aLinksList = aLinks.length
const sLinks = document.querySelectorAll("section.s-link")
sLinksList = sLinks.length;

for (let i = 0; i < aLinksList; i++) {
    const a = aLinks[i]
    a.addEventListener("click", function () {
        styleSwitcherCloseIfOpen()
        //its set as back section for loading only//
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

        if (!this.classList.contains("nope")) {
            // active link remove/add //
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
    })
}
/* ------===== nav-active overwrite for about/hire btn =====------- */
document.querySelector("a.hire-me").addEventListener("click", function () {
    const ulNav =  document.querySelector("ul.nav");
          ulNav.lastElementChild.lastElementChild.classList.add("active")
})

/* ------===== start & stop lazy load youtube iframe =====------- */
function startStopLazy() {
    const activeSection = document.querySelector("section.active")
    const prevSection = document.querySelector("section.back-section")

    if (activeSection.classList.contains("portfolio-example")) {
        activeId = activeSection.id
        iframeId = activeId + "-iframe"
        setIframeGif()
        setTimeout(startLazy, 700)
    } else if (prevSection.classList.contains("portfolio-example")) {
        setTimeout(setIframeGif, 700)
    }

    function setIframeGif() {
        document.getElementById(iframeId).innerHTML = "<img src=images/loading.gif alt=loading-gif>"
    }

    function startLazy() {
        portfolio = "<iframe class=youtube, src=https://www.youtube.com/embed/nc_HHo04-NU alt=crud-project> </iframe>"
        crud = "<iframe class=youtube, src=https://www.youtube.com/embed/7CruXGDHbgg alt=crud-project> </iframe>"
        secrets = "<iframe class=youtube, src=https://www.youtube.com/embed/nc_HHo04-NU alt=crud-project> </iframe>"

        switch (iframeId) {
            case "portfolio-iframe":
                document.getElementById(iframeId).innerHTML = portfolio
            case "crud-iframe":
                document.getElementById(iframeId).innerHTML = crud
            case "secrets":
                document.getElementById(iframeId).innerHTML = secrets
        }
    }
}

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