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

            const spnActive = colors[y]
            
            if (colors[y].classList.contains("active-color")) {
                colors[y].classList.remove("active-color")
            } 
        }
        
        spn.classList.add("active-color")
    })
}

/* ------=====  style switcher toggle =====------- */
const styleSwitcherToggler = document.querySelector(".style-toggler");

styleSwitcherToggler.addEventListener("click", () => {
    if (window.innerWidth < 1200 && aside.classList.contains("open")) {
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
    if (window.innerWidth < 1200 && document.querySelector(".style-switcher").classList.contains("open")) {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        activeSection.classList.toggle("open");
        document.querySelector(".style-switcher").classList.remove("open");
        // if 600<small screen<1999 & project section |or| about section is set as back-section  => remove it from back //
        // setting active section && aside closes the project section would be visiable in the back //
        //  on animation removing to have blank backsection will prevent it  //
    } else if (window.innerWidth < 1200 && document.querySelector("section.project").classList.contains("back-section") || document.querySelector("section.about").classList.contains("back-section")) {
        document.querySelector("section.project").classList.remove("back-section")
        document.querySelector("section.about").classList.remove("back-section")
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
const hammer = new Hammer(
    document.getElementById('gesture-element'),
    { inputClass: Hammer.TouchMouseInput }
);

function addActiveSectionClass() {
    const activeSection = document.querySelector("section.active")
    activeSection.classList.toggle("open");
}

hammer.on('swiperight', function () {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open")
    } else if (window.innerWidth < 1200 && (document.querySelector("section.project").classList.contains("back-section") || document.querySelector("section.about").classList.contains("back-section"))) {
        document.querySelector("section.project").classList.remove("back-section")
        document.querySelector("section.about").classList.remove("back-section")
        aside.classList.add("open");
        navTogglerBtn.classList.add("open");
        addActiveSectionClass();
    } else if (window.innerWidth < 1200 && aside.classList.contains("open")) {
        // already opened once //
    } else {
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
    allSection = document.querySelectorAll("section:not(section.back-section)"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        setAndrasBack() 
        stopIframe()
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

        if (window.innerWidth < 1999) {
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
    // console.log(num);

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

    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");

    } if (window.innerWidth < 1200 && aside.classList.contains("open")) {
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

for (let i = 0; i < totalProjectList; i++) {
    const a = projectList[i].querySelector("a");
    a.addEventListener("click", function () {

        const sectionIndex = this.getAttribute("data-section-index");
        const sectionId = this.getAttribute("href");
        sectionIdNumber = sectionId.slice(5, 6)

        if (document.querySelector(".style-switcher").classList.contains("open")) {
            document.querySelector(".style-switcher").classList.remove("open");

        } if (window.innerWidth < 1999) {
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
        setLazy()
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
            // console.log(projectActiveIndex);
            removeBackSection();
            addBackSection(projectActiveIndex);
        }
    }
}

/* ------===== logo as btn redirect section =====------- */
// document.querySelector(".logo").addEventListener("click", () => {
//     const activeSection = document.querySelector("section.active")
//     activeSection.classList.add("back-section")
//     activeSection.classList.remove("active")
//     console.log(activeSection);

//     document.querySelector("section.andras").classList.add("active")
// })

// function setAndrasBack () {
//     if (document.querySelector("section.active").classList.contains("andras")) {
//         document.querySelector("section.andras").classList.remove("active")
//         document.querySelector("section.andras").classList.add("back-section")
//     }
// } 

document.querySelector(".andras").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    console.log(sectionIndex);

    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");

    } if (window.innerWidth < 1200 && aside.classList.contains("open")) {
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

function setAndrasBack() {
    const andras = document.querySelector("section.andras")
    if (andras.classList.contains("active")) {
        andras.classList.add("back-section")
        andras.classList.remove("active")
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