/* ------===== tying animation =====------- */
var typed = new Typed(".typing", {
    strings: ["Web developer", "Web designer", "And more.."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

/* ------===== hammer.js (swipe) =====------- */
var myElement = document.querySelector('section');
var hammer = new Hammer(myElement);

hammer.on('swiperight', function() {
    asideSectionTogglerBtn();
  });

  hammer.on('swipeleft', function(e) {
    asideSectionTogglerBtn();

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
            asideSectionTogglerBtn();
        }
    })
}

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
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");

    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

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
        showSection(this);
        removeBackSection();
        addBackSection(sectionIndex);
        console.log(sectionIndex);
    })
}

/* ------===== get ID of project-section =====------- */
function setActiveProjectBack() {
    const project = document.querySelector(".project")
    const projectActive = document.querySelector("section.active")

    if (project.classList.contains("back-section")) {
        console.log("back");

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
    const loadTime = (Date.now() - window.performance.timing.navigationStart)/1000;
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

