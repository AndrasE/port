/* ------===== tying animation typed.js =====------- */
var typed = new Typed(".typing", {
    strings: ["Web developer", "Web designer", "And more.."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
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

/* ------===== theme light/dark mode toggle =====------- */
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("light")
})

/* ------===== sun/moon icon toggle on DOM-load =====------- */
window.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-moon")
    } else {
        dayNight.querySelector("i").classList.add("fa-sun")
    }
})

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
/* ------===== open/close classes add/remove for aside btn activeSection functions =====------- */
const aside = document.querySelector(".aside");
const navTogglerBtn = document.querySelector(".nav-toggler");
const styleSwitcher = document.querySelector(".style-switcher");
const activeSection = document.querySelector("section.active");

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
function activeSectionOpen1200() {
    const activeSection = document.querySelector("section.active")
    if (window.innerWidth < 1200) {
        activeSection.classList.add("open")
    }
}
function activeSectionClose1200() {
    const activeSection = document.querySelector("section.active")
    if (window.innerWidth < 1200) {
        activeSection.classList.remove("open")
    }
}
function activeSectionToggle1200() {
    const activeSection = document.querySelector("section.active")
    if (window.innerWidth < 1200) {
        activeSection.classList.toggle("open")
    }
}
/* ------=====  style switcher toggle =====------- */
styleSwitcher.addEventListener("click", () => {

    if (window.innerWidth < 1200 && aside.classList.contains("open")) {
        aside.classList.remove("open");
        navTogglerBtn.classList.remove("open");
        styleSwitcher.classList.toggle("open")
        document.querySelector("section.active").classList.toggle("open")
    } else {
        styleSwitcher.classList.toggle("open")
    }
})

/* ------===== toggle aside if style switcher open => close =====------- */


navTogglerBtn.addEventListener("click", () => {
    styleSwitcherCloseIfOpen()
    asideNavAndBtnToggle()
    activeSectionToggle1200()
    // if 600<small screen<1999 & project section |or| about section is set as back-section  => remove it from back //
    // setting active section && aside closes the project section would be visiable in the back //
    //  on animation removing to have blank backsection will prevent it  //
    if (window.innerWidth < 1200
        && document.querySelector("section.project").classList.contains("back-section")
        || document.querySelector("section.about").classList.contains("back-section")
        || document.querySelector("section.port-examples").classList.contains("back-section")) {
        document.querySelector("section.project").classList.remove("back-section")
        document.querySelector("section.about").classList.remove("back-section")
        document.querySelector("section.port-examples").classList.remove("back-section")
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
    } else if (window.innerWidth < 1200 && document.querySelector("section.project").classList.contains("back-section")
        || document.querySelector("section.about").classList.contains("back-section")
        || document.querySelector("section.port-examples").classList.contains("back-section")) {
        document.querySelector("section.project").classList.remove("back-section")
        document.querySelector("section.about").classList.remove("back-section")
        document.querySelector("section.port-examples").classList.remove("back-section")
        asideBtnOpen1200()
        activeSectionOpen1200()
    } else {
        asideBtnOpen1200()
        activeSectionOpen1200()
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

/* ------===== aside nav bar / show-hide sections =====------- */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll("section:not(section.back-section)"),
    totalSection = allSection.length,
    blankSectionBack = document.querySelector("section.blank.back-section")

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {

        stopIframe()
        removeBackSection()
        styleSwitcherCloseIfOpen()
        blankSectionBack.classList.remove("back-section")

        if (document.querySelector("a.andras").classList.contains("underline")) {
            document.querySelector("a.andras").classList.remove("underline")
        }

        const andras = document.querySelector("section.andras")
        if (andras.classList.contains("active")) {
            blankSectionBack.classList.remove("back-section")
            andras.classList.add("back-section")
        }

        for (let j = 0; j < totalNavList; j++) {
            setActiveProjectBack();
            portfolioCheck()
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j)
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }

        this.classList.add("active")
        showSection(this)
        asideBtnClose1200()
        activeSectionClose1200()
    })
}

/* ------===== show-hide andras section =====------- */
document.querySelector(".andras").addEventListener("click", function () {
    const activeSection = document.querySelector("section.active")
    const andrasSection = document.querySelector("section.andras")
    removeBackSection()
    stopIframe()
    styleSwitcherCloseIfOpen()

    document.querySelector("a.andras").classList.add("underline")

    if (window.innerWidth < 1200 && aside.classList.contains("open")) {
        aside.classList.remove("open")
        navTogglerBtn.classList.remove("open");
        activeSection.classList.add("back-section")
        activeSection.classList.remove("active")
        andrasSection.classList.add("active")
        document.querySelector("section.active").classList.remove("open")
        if (document.querySelectorAll("a.active").length != 0) {
            document.querySelector("a.active").classList.remove("active")
        }
    } else {
        activeSection.classList.add("back-section")
        activeSection.classList.remove("active")
        andrasSection.classList.add("active")
        document.querySelector("section.active").classList.remove("open")
        if (document.querySelectorAll("a.active").length != 0) {
            document.querySelector("a.active").classList.remove("active")
        }
    }
})
function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num) {
    allSection[num].classList.add("back-section")
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active")
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

/* ------===== hire-me btn redirect not using nav event listeners above =====------- */
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    console.log(sectionIndex);
    styleSwitcherCloseIfOpen()
    asideBtnClose1200()
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
    activeSectionClose1200()
})

/* ------===== project navigation from Nav/project  =====------- */
/* ------===== clicking project img redirect project page =====------- */
/* ------===== project collection in backsection (data-secton-index=3) =====------- */
const projectNav = document.querySelector(".project-nav"),
    projectList = projectNav.querySelectorAll(".project-img"),
    totalProjectList = projectList.length;

for (let i = 0; i < totalProjectList; i++) {
    const a = projectList[i].querySelector("a");
    a.addEventListener("click", function () {
        const sectionIndex = this.getAttribute("data-section-index");
        const sectionId = this.getAttribute("href");
        sectionIdNumber = sectionId.slice(5, 6)

        styleSwitcherCloseIfOpen()
        showSection(this);
        removeBackSection();
        addBackSection(sectionIndex);
        asideBtnClose1200()
        activeSectionClose1200()
        setLazy()
    })
}

/* ------===== get project-example`s data-section-index and send it back =====------- */
function setActiveProjectBack() {
    const project = document.querySelector(".project")
    const projectActive = document.querySelector("section.active")

    if (project.classList.contains("back-section")) {
        if (projectActive.classList.contains("port-examples")) {
            const projectActiveIndex = projectActive.getAttribute("data-section-index")
            removeBackSection();
            addBackSection(projectActiveIndex);
        }
    }
}

/* ------===== portfolio-project-link redirect to section =====------- */
document.querySelector(".portfolio-project-link").addEventListener("click", () => {
    const activeSection = document.querySelector("section.active")
    stopIframe()
    styleSwitcherCloseIfOpen()
    activeSection.classList.add("back-section")
    activeSection.classList.remove("active")
    document.querySelector("section.portfolio-project").classList.add("active")
    asideBtnClose1200()
    activeSection.classList.add("back-section")
    activeSectionClose1200()
})

function portfolioCheck() {
    const activeSection = document.querySelector("section.active")

    if (document.querySelector("section.portfolio-project").classList.contains("active")) {
        if (window.innerWidth < 1200 && aside.classList.contains("open")) {
            document.querySelector("section.project").classList.remove("hidden")
            document.querySelector("section.blank").classList.add("back-section")
        }
        if (activeSection.classList.contains("portfolio-project")) {
            activeSection.classList.add("back-section")
        }
    }
}

/* ------===== start & stop lazy load youtube iframe =====------- */
function setLazy() {
    iFrame1 = "<iframe class=youtube, src=https://www.youtube.com/embed/nc_HHo04-NU alt=crud-project> </iframe>"
    iFrame2 = "<iframe class=youtube, src=https://www.youtube.com/embed/7CruXGDHbgg alt=crud-project> </iframe>"
    iFrame3 = "<iframe class=youtube, src=https://www.youtube.com/embed/nc_HHo04-NU alt=crud-project> </iframe>"

    document.getElementById("port-example-iframe-" + sectionIdNumber).innerHTML = "<img src=images/loading.gif alt=loading-gif>"

    function startLazy() {
        if (sectionIdNumber === "1") {
            document.getElementById("port-example-iframe-" + sectionIdNumber).innerHTML = iFrame1
        } else if (sectionIdNumber === "2") {
            document.getElementById("port-example-iframe-" + sectionIdNumber).innerHTML = iFrame2
        } else {
            document.getElementById("port-example-iframe-" + sectionIdNumber).innerHTML = iFrame3
        }
    }
    setTimeout(startLazy, 700)
}

function stopIframe() {
    if (document.querySelector(".port-examples.active")) {
        activeIframe = document.querySelector(".port-examples.active").id
        activeIframeNumber = activeIframe.slice(4, 5);
        function stop() {
            document.getElementById("port-example-iframe-" + activeIframeNumber).innerHTML = "<img src=images/loading.gif alt=loading-gif>"
        }
        setTimeout(stop, 700)
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