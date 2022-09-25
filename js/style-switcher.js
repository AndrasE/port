/* ------===== toggle style switcher =====------- */
const styleSwitcherToggler = document.querySelector(".style-toggler");
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open")
})

/* ------===== hide style switcher on scroll =====------- */
const mainContainerClick = document.querySelector(".main-container");
mainContainerClick.addEventListener("click", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open")
    }
})

/* ------===== theme colors =====------- */
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

/* ------===== theme light/dark mode =====------- */
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("light")
})


window.addEventListener('DOMContentLoaded', () => {
    if(document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-moon") 
    } else {
        dayNight.querySelector("i").classList.add("fa-sun") 
    }
    })


