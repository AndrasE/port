// Initialize typing animation with Typed.js
var typed = new Typed(".typing", {
  strings: ["Web developer"],
  typeSpeed: 110,
  backSpeed: 60,
  loop: false,
});

// Gesture handling with Hammer.js
const hammer = new Hammer(document.getElementById("gesture-element"), {
  inputClass: Hammer.TouchMouseInput,
});

// Swipe right open navigation on mobile and tablet otherwise close style switcher if open
hammer.on("swiperight", () => {
  if (styleSwitcher.classList.contains("open")) {
    styleSwitcher.classList.remove("open");
  } else {
    asideBtnOpen1200();
    addOpenClass1200();
    backSectionCheck1200();
    imgAnimationTablet();
  }
});

// Swipe left open navigation on mobile and tablet otherwise open style switcher is closed
hammer.on("swipeleft", () => {
  if (aside.classList.contains("open")) {
    asideBtnClose1200();
    activeSectionToggle1200();
    imgAnimationTablet();
  } else {
    styleSwitcher.classList.add("open");
  }
});

// Toggle day/night mode with double tap
hammer.on("doubletap", () => {
  const icon = dayNight.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
  document.body.classList.toggle("light");
  imgAnimation();
});

// Navigate back with the back button (as its a single page app wouldn`t have this functionality by default)
window.addEventListener("popstate", function () {
  const currentUrl = window.location.href;
  const currentUrlId = currentUrl.split("#")[1];
  const navDifference = navHistory.length - navPopHistory.length;
  const lastId = navHistory[navHistory.length - 1];
  const secondLastId = navHistory[navHistory.length - 2];
  if (navPopHistory.slice(-1).pop() != currentUrlId) {
    if (navDifference >= 0) {
      navPopHistory.push(currentUrlId);
    }
  }
  if (navHistory.length == 2 && navPopHistory.length == 3) {
    navPopHistory.pop();
  } else {
    if (
      navHistory.length != navPopHistory.length &&
      navHistory.length > 2 &&
      navDifference >= 0 &&
      navPopHistory.length > 3
    ) {
      lastSection = document.getElementById(secondLastId);
      currentSection = document.getElementById(lastId);
      for (let j = 0; j < sLinksList; j++) {
        const s = sLinks[j];
        s.classList.remove("back-section");
      }
      currentSection.classList.add("back-section");
      for (let j = 0; j < sLinksList; j++) {
        const s = sLinks[j];
        s.classList.remove("active");
      }
      lastSection.classList.add("active");
      const hrefsecondLastId = "#" + secondLastId;
      const getLink = document.querySelector(
        "a[href='" + hrefsecondLastId + "']"
      );
      if (!getLink.classList.contains("nope")) {
        for (let i = 0; i < aLinksList; i++) {
          const a = aLinks[i];
          a.classList.remove("active");
          a.classList.remove("underline");
        }
        getLink.classList.add("active");
      }
      if (getLink.getAttribute("href") === "#andras") {
        getLink.classList.remove("active");
        getLink.classList.add("underline");
      }
      startStopLazy();
      asideBtnClose1200();
      removeOpenClass1200();
      styleSwitcherCloseIfOpen();
      navPopHistory.splice(navPopHistory.length - 2, 2);
      navHistory.pop();
      console.log("Backbutton pressed; History: " + navHistory);
    }
  }
});

// Toggle day/night mode on click and change icon also change profile image with animation
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
  const icon = dayNight.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
  document.body.classList.toggle("light");
  imgAnimation();
});

// Set initial day/night mode icon when the page is loaded
window.addEventListener("DOMContentLoaded", () => {
  const icon = dayNight.querySelector("i");
  if (document.body.classList.contains("dark")) {
    icon.classList.add("fa-moon");
  } else {
    icon.classList.add("fa-sun");
  }
});

// Change active style in style switcher (highlight the selected color)
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

// Handle color selection in style switcher (change active style and color)
const colorBox = document.querySelector(".colors");
const colors = colorBox.querySelectorAll("span");
colors.forEach((spn) => {
  spn.addEventListener("click", () => {
    colors.forEach((color) => color.classList.remove("active-color"));
    spn.classList.add("active-color");
  });
});

// Modal functionality for CV images
const modal = document.querySelector(".modal");
const modalDarkCvImg = document.querySelector("a.modal-cv-dark");
const modalLightCvImg = document.querySelector("a.modal-cv-light");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

// Modal functionality
function toggleModal() {
  modal.classList.toggle("show-modal");
}

// Close modal if clicked on or outside the modal
function windowOnClick(event) {
  if (
    event.target === modal ||
    event.target === modalDarkCvImg ||
    event.target === modalLightCvImg
  ) {
    toggleModal();
  }
}

// Event listeners for modal functionality
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// Navigation and style switcher functionality
const aside = document.querySelector(".aside");
const navTogglerBtn = document.querySelector(".nav-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

// Open and close style switcher
function styleSwitcherCloseIfOpen() {
  if (styleSwitcher.classList.contains("open")) {
    styleSwitcher.classList.remove("open");
  }
}

//Function to toggle navigation and navigation button depending on the screen size
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
  const activeSection = document.querySelector("section.active");
  if (window.innerWidth < 1200) {
    activeSection.classList.add("open");
  }
}

function removeOpenClass1200() {
  const activeSection = document.querySelector("section.active");
  if (window.innerWidth < 1200) {
    activeSection.classList.remove("open");
  }
}

function activeSectionToggle1200() {
  const activeSection = document.querySelector("section.active");
  if (window.innerWidth < 1200) {
    activeSection.classList.toggle("open");
  }
}

// Hide content in backgorund when page is loaded an or required (single page app, the last section would be visable on load and certain times when the user navigates)
function backSectionCheck1200() {
  if (
    window.innerWidth > 600 &&
    window.innerWidth < 1200 &&
    aside.classList.contains("open")
  ) {
    const sections = ["projects", "about", "portfolio-example"];
    sections.forEach((section) => {
      document
        .querySelector(`section.${section}`)
        .classList.remove("back-section");
    });
  }
}

// Handle style switcher button click
const styleSwitcherToggler = document.querySelector(".style-toggler");
styleSwitcherToggler.addEventListener("click", () => {
  if (window.innerWidth < 1200 && aside.classList.contains("open")) {
    asideNavAndBtnToggle();
    activeSectionToggle1200();
    removeOpenClass1200();
  }
  styleSwitcher.classList.toggle("open");
});

navTogglerBtn.addEventListener("click", () => {
  styleSwitcherCloseIfOpen();
  asideNavAndBtnToggle();
  activeSectionToggle1200();
  backSectionCheck1200();
  imgAnimationTablet();
});

const navHistory = ["home", "home"];
const navPopHistory = ["home", "home"];
function navHistoryCheck() {
  if (navHistory.slice(-1).pop() != getId) {
    navHistory.push(getId);
  }
}

// Navigate to sections when the links are clicked (a-link are the anchor links in the navigation, s-link are the sections)
const aLinks = document.querySelectorAll("a.a-link");
aLinksList = aLinks.length;
const sLinks = document.querySelectorAll("section.s-link");
sLinksList = sLinks.length;
for (let i = 0; i < aLinksList; i++) {
  const a = aLinks[i];
  a.addEventListener("click", function () {
    document.querySelector("section.blank").classList.remove("back-section");
    getId = a.getAttribute("href").split("#")[1];
    getSection = document.getElementById(getId);
    currentSection = document.querySelector("section.active");
    for (let j = 0; j < sLinksList; j++) {
      const s = sLinks[j];
      s.classList.remove("back-section");
    }
    currentSection.classList.add("back-section");
    for (let j = 0; j < sLinksList; j++) {
      const s = sLinks[j];
      s.classList.remove("active");
    }
    getSection.classList.add("active");
    if (!this.classList.contains("nope")) {
      for (let i = 0; i < aLinksList; i++) {
        const a = aLinks[i];
        a.classList.remove("active");
        a.classList.remove("underline");
      }
    }
    this.classList.add("active");
    if (this.getAttribute("href") === "#andras") {
      this.classList.remove("active");
      this.classList.add("underline");
    }
    styleSwitcherCloseIfOpen();
    startStopLazy();
    asideBtnClose1200();
    removeOpenClass1200();
    navHistoryCheck();
  });
}

// Navigate to contact me section when the button is clicked
document.querySelector("a.contact-me").addEventListener("click", function () {
  const ulNav = document.querySelector("ul.nav");
  ulNav.lastElementChild.lastElementChild.classList.add("active");
});

// Start/stop load iframes in portfolio projects (in user navigates away from the project it stops the iframe)
function startStopLazy() {
  const activeSection = document.querySelector("section.active");
  const prevSection = document.querySelector("section.back-section");
  if (
    activeSection.classList.contains("portfolio-example") &&
    activeSection.classList.contains("iframed")
  ) {
    activeId = activeSection.id;
    iframeId = activeId + "-iframe";
    setIframeGif();
    setTimeout(startLazy, 700);
    console.log("Iframe started");
  } else if (prevSection.classList.contains("portfolio-example")) {
    setTimeout(setIframeGif, 700);
    console.log("Iframe stopped");
  }
  function setIframeGif() {
    document.getElementById(iframeId).innerHTML =
      "<img src=images/loading.gif alt=loading-gif>";
    document.getElementById("iframehide").classList.add("opacity0");
    document.getElementById("iframehide").classList.add("hidden");
    document.getElementById("phide").classList.remove("hidden");
    document.getElementById("phide").classList.remove("opacity0");
  }

  // Lazy load iframes in portfolio projects
  function startLazy() {
    const usapp =
      '<iframe src="https://www.youtube.com/embed/w_1VowseA3g?si=nVZnATqO8weXgaZx" allowfullscreen alt="usapp"></iframe>';
    const portfolio =
      '<iframe src="https://www.youtube.com/embed/zkyBc4wrhRI" allowfullscreen alt="portfolio"></iframe>';
    const crud =
      '<iframe src="https://www.youtube.com/embed/Uz_jetkz_i4" allowfullscreen alt="crud"></iframe>';
    const secrets =
      '<iframe src="https://www.youtube.com/embed/AOAkFx3xz1Y" allowfullscreen alt="secrets"></iframe>';
    const todo =
      '<iframe src="https://codesandbox.io/embed/to-do-veyju?fontsize=14&hidenavigation=1&theme=dark" alt="todo"></iframe>';
    const next =
      '<iframe class="drum" src="https://andrase.github.io/drum/" alt="drum"></iframe>';
    switch (iframeId) {
      case "usapp-iframe":
        document.getElementById(iframeId).innerHTML = usapp;
        break;
      case "portfolio-iframe":
        document.getElementById(iframeId).innerHTML = portfolio;
        break;
      case "crud-iframe":
        document.getElementById(iframeId).innerHTML = crud;
        break;
      case "secrets-iframe":
        document.getElementById(iframeId).innerHTML = secrets;
        break;
      case "todo-iframe":
        document.getElementById(iframeId).innerHTML = todo;
        break;
      case "next-iframe":
        document.getElementById(iframeId).innerHTML = next;
        break;
      default:
        console.warn("No matching iframe ID found.");
    }
  }
}

// animate out text and lazy load iframe when the button is clicked o todo project page
const toDoButton = document.getElementById("codesandbox");
toDoButton.addEventListener("click", () => {
  if (document.getElementById("iframehide").classList.contains("hidden")) {
    setOpacityButtonIn();
    setOpacityP();
    setTimeout(setHiddenP, 550);
    setHiddenIframe();
    setTimeout(setOpacityIframe, 600);
    setTimeout(setOpacityButtonOut, 630);
  } else {
    setOpacityIframe();
    setOpacityButtonIn();
    setTimeout(setHiddenIframe, 450);
    setTimeout(setHiddenP, 550);
    setTimeout(setOpacityP, 600);
    setTimeout(setOpacityButtonOut, 630);
  }
  function setOpacityP() {
    document.getElementById("phide").classList.toggle("opacity0");
    document.getElementById("phide").classList.toggle("opacity100");
  }
  function setHiddenP() {
    document.getElementById("phide").classList.toggle("hidden");
  }
  function setHiddenIframe() {
    document.getElementById("iframehide").classList.toggle("hidden");
  }
  function setOpacityIframe() {
    document.getElementById("iframehide").classList.toggle("opacity0");
    document.getElementById("iframehide").classList.toggle("opacity100");
  }
  function setOpacityButtonIn() {
    toDoButton.classList.add("hidden");
  }
  function setOpacityButtonOut() {
    toDoButton.classList.remove("hidden");
  }
});

// Swap images with animation when the day/night mode is toggled
function imgAnimation() {
  meImg1 = document.getElementById("me-img1");
  meImg2 = document.getElementById("me-img2");
  meImg1opacity0();
  meImg2opacity0();
  if (!meImg1.classList.contains("hidden")) {
    setTimeout(meImg1hidden, 200);
    setTimeout(meImg2notHidden, 201);
    setTimeout(meImg2opacity100, 202);
    setTimeout(removeOpacities, 203);
  } else {
    setTimeout(meImg2hidden, 200);
    setTimeout(meImg1notHidden, 201);
    setTimeout(meImg1opacity100, 202);
    setTimeout(removeOpacities, 203);
  }
  function meImg1opacity0() {
    meImg1.classList.add("opacity-img-0");
  }
  function meImg1opacity100() {
    meImg1.classList.add("opacity-img-100");
  }
  function meImg1hidden() {
    meImg1.classList.add("hidden");
  }
  function meImg1notHidden() {
    meImg1.classList.remove("hidden");
  }
  function meImg2opacity0() {
    meImg2.classList.add("opacity-img-0");
  }
  function meImg2opacity100() {
    meImg2.classList.add("opacity-img-100");
  }
  function meImg2hidden() {
    meImg2.classList.add("hidden");
  }
  function meImg2notHidden() {
    meImg2.classList.remove("hidden");
  }
  function removeOpacities() {
    meImg1.classList.remove("opacity-img-100");
    meImg2.classList.remove("opacity-img-100");
    meImg1.classList.remove("opacity-img-0");
    meImg2.classList.remove("opacity-img-0");
  }
}

// Tablet image animation (hide/show image depending on aside open/close with animation)
function imgAnimationTablet() {
  if (991 < window.innerWidth < 1200 && aside.classList.contains("open")) {
    document.querySelector(".home-img").classList.add("hidden");
    document.querySelector(".home-img").classList.add("opacity-img-0");
    document.querySelector(".home-info").classList.add("maxflex");
  } else {
    document.querySelector(".home-info").classList.remove("maxflex");
    setTimeout(removeOpacities, 500);
  }
  function removeOpacities() {
    document.querySelector(".home-img").classList.remove("opacity-img-0");
    document.querySelector(".home-img").classList.remove("hidden");
  }
}

// Form functionality
const formSubmitBtn = document.querySelector(".form-submit-btn");
function resetForm() {
  document.getElementById("formSubmitCo").reset();
}
formSubmitBtn.addEventListener("click", () => {
  setTimeout(resetForm, 100);
});

// Performance metrics for DOMContentLoaded and load events
addEventListener("DOMContentLoaded", (event) => {
  DOMContentLoaded = event.timeStamp / 1000;
  DOMContentLoadedStr = String(DOMContentLoaded).slice(0, 5);
  console.log("DOM Content Loaded in " + DOMContentLoadedStr + "s " + "(HTML)");
});
window.addEventListener("load", (event) => {
  loadTime = (Date.now() - window.performance.timing.navigationStart) / 1000;
  console.log("All assets are loaded in " + loadTime + "s " + "(CSS, JS)");
});
