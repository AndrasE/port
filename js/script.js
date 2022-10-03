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

/* ------=====  style switcher toggle =====------- */
const styleSwitcherToggler = document.querySelector(".style-toggler");

styleSwitcherToggler.addEventListener("click", () => {
    if (window.innerWidth < 1199 && aside.classList.contains("open")) {
        aside.classList.remove("open");
        navTogglerBtn.classList.remove("open");
        document.querySelector(".style-switcher").classList.toggle("open")
        document.querySelector("section.active").classList.toggle("open")
    } else {
        document.querySelector(".style-switcher").classList.toggle("open")
    }
})

/* ------===== toggle aside if style switcher open => close =====------- */
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    const activeSection = document.querySelector("section.active")

    // if small screen & style switcher open => close style switcher & open aside //
    if (window.innerWidth < 1199 && document.querySelector(".style-switcher").classList.contains("open")) {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        activeSection.classList.toggle("open");
        document.querySelector(".style-switcher").classList.remove("open");
        // if 600<small screen<1200 & project section is set as back-section  => remove it from back //
        // setting active section && aside closes the project section would be visiable in the back //
        //  on animation removing to have backsection will prevent it  //
    } else if (window.innerWidth < 1199 && document.querySelector("section.project").classList.contains("back-section")) {
        document.querySelector("section.project").classList.remove("back-section")
        aside.classList.toggle("open");
        activeSection.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
    } else {
        aside.classList.toggle("open");
        activeSection.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
    }
})


/* ------===== hammer.js (swipes) =====------- */
var myElement = document.querySelector("section.active");
var hammer = new Hammer(myElement);

function addActiveSectionClass() {
    const activeSection = document.querySelector("section.active")
    activeSection.classList.toggle("open");
}
hammer.on('swiperight', function () {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open")
    } else if (window.innerWidth < 1199) {
        aside.classList.add("open");
        navTogglerBtn.classList.add("open");
        addActiveSectionClass();
    }
});

hammer.on('swipeleft', function () {
    if (aside.classList.contains("open")) {
        aside.classList.remove("open")
        navTogglerBtn.classList.remove("open");
        addActiveSectionClass();
    } else {
        document.querySelector(".style-switcher").classList.add("open")
    }
});

hammer.on('doubletap', function (e) {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("light")
});

/* ------===== aside nav bar / show-hide sections =====------- */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {

        removeBackSection()
        // for (let i = 0; i < totalSection; i++) {
        //     allSection[i].classList.remove("back-section")
        // }

        for (let j = 0; j < totalNavList; j++) {
            setActiveProjectBack();

            if (navList[j].querySelector("a").classList.contains("active")) {

                addBackSection(j)
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this)

        if (window.innerWidth < 1200) {
            aside.classList.remove("open");
            navTogglerBtn.classList.remove("open");
            document.querySelector("section.active").classList.remove("open")
        }
    })
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    console.log(num);

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
    // console.log(sectionIndex);

    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    } if (window.innerWidth < 1199 && aside.classList.contains("open")) {
        aside.classList.remove("open")
        navTogglerBtn.classList.remove("open");
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
        document.querySelector("section.active").classList.remove("open")
    } else {
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
        document.querySelector("section.active").classList.remove("open")
    }
})


/* ------===== project navigation from Nav/project  =====------- */
/* ------===== clicking project img redirect project page =====------- */
/* ------===== project collection in backsection (data-secton-index=3) =====------- */

const projectNav = document.querySelector(".project-nav"),
    projectList = projectNav.querySelectorAll(".project-img"),
    totalProjectList = projectList.length;

function hideProject() {
    document.getElementById("project").className.add("open");
}

for (let i = 0; i < totalProjectList; i++) {
    const a = projectList[i].querySelector("a");
    a.addEventListener("click", function () {

        const sectionIndex = this.getAttribute("data-section-index");

        if (document.querySelector(".style-switcher").classList.contains("open")) {
            document.querySelector(".style-switcher").classList.remove("open");
        } if (window.innerWidth < 1200) {
            showSection(this);
            removeBackSection();
            addBackSection(sectionIndex);
            // console.log(sectionIndex);
            aside.classList.remove("open");
            navTogglerBtn.classList.remove("open");
            document.querySelector("section.active").classList.remove("open")
        } else {
            showSection(this);
            removeBackSection();
            addBackSection(sectionIndex);
        }
    })
}

/* ------===== get project-example`s data-section-index and send it back =====------- */
function setActiveProjectBack() {
    const project = document.querySelector(".project")
    const projectActive = document.querySelector("section.active")

    if (project.classList.contains("back-section")) {
        // console.log("back");

        if (projectActive.classList.contains("port-examples")) {
            const projectActiveIndex = projectActive.getAttribute("data-section-index")
            console.log(projectActiveIndex);
            removeBackSection();
            addBackSection(projectActiveIndex);
        }
    }
}


/* ------===== all not require sections remain hidden until DOM loaded =====------- */
/* ------===== reducing slow load time artifacts, once loaded remove class hidden =====------- */

addEventListener('DOMContentLoaded', (event) => {

    const hiddenSectionList = document.querySelectorAll("section.hidden")
    const totalHiddenSection = hiddenSectionList.length

    console.log("DOM Content Loaded with " + totalHiddenSection + " hidden sections (to reduce overlaying artifacts onload)")

    setTimeout(removeHiddenClasses, 600)

    function removeHiddenClasses() {
        for (let i = 0; i < totalHiddenSection; i++) {
            hiddenSectionList[i].classList.remove("hidden");
        }
        console.log("Hidden classes removed after inital animation (0.6s)");
    }
})


/* ------===== performance check in console =====------- */
window.addEventListener('load', (event) => {
    const loadTime = (Date.now() - window.performance.timing.navigationStart) / 1000;
    console.log('All assets are loaded in ' + (loadTime) + "s");
});


/* ------===== lazy load youtube iframe =====------- */

/* ------===== port-example-iframe-1 =====------- */
function iframe1() {
    document.getElementById("port-example-iframe-1").innerHTML = "<iframe class=youtube, src=https://www.youtube.com/embed/nc_HHo04-NU alt=crud-project> </iframe>"
}

function iframeImg1() {
    document.getElementById("port-example-iframe-1").innerHTML = " <img src=images/loading.gif alt=loading-gif>"
}

document.getElementById("port-example-img-1").addEventListener("click", () => {
    iframeImg1()
    setTimeout(iframe1, 600)
});

/* ------===== port-example-iframe-2 =====------- */
function iframe2() {
    document.getElementById("port-example-iframe-2").innerHTML = "<iframe class=youtube, src=https://www.youtube.com/embed/7CruXGDHbgg alt=crud-project> </iframe>"
}

function iframeImg2() {
    document.getElementById("port-example-iframe-2").innerHTML = " <img src=images/loading.gif alt=loading-gif>"
}

document.getElementById("port-example-img-2").addEventListener("click", () => {
    iframeImg2()
    setTimeout(iframe2, 600)
});

/* ------===== port-example-iframe-3 =====------- */
function iframe3() {
    document.getElementById("port-example-iframe-3").innerHTML = "<iframe class=youtube, src=https://www.youtube.com/embed/bKgZfTPVJHQ alt=crud-project> </iframe>"
}

function iframeImg3() {
    document.getElementById("port-example-iframe-3").innerHTML = " <img src=images/loading.gif alt=loading-gif>"
}

document.getElementById("port-example-img-3").addEventListener("click", () => {
    iframeImg3()
    setTimeout(iframe3, 600)
});

