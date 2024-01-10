// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener("click", function () {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
    const csUL = document.querySelector("#cs-expanded");
    const csExpanded = csUL.getAttribute("aria-expanded");

    if (csExpanded === "false") {
        csUL.setAttribute("aria-expanded", "true");
    } else {
        csUL.setAttribute("aria-expanded", "false");
    }
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll("#cs-navigation .cs-dropdown"));
for (const item of dropDowns) {
    const onClick = () => {
        item.classList.toggle("cs-active");
    };
    item.addEventListener("click", onClick);
}

// Navbar changes on scroll when the div that is created reaches a certain area
const navbar = document.querySelector("#cs-navigation");
const scrollwatcher = document.createElement("div");

scrollwatcher.setAttribute("data-scroll-watcher", "");
navbar.before(scrollwatcher);

const navobserver = new IntersectionObserver(
    (entries) => {
        navbar.classList.toggle("scrolled", !entries[0].isIntersecting);
    },
    { rootMargin: "15px 0px 0px 0px" }
);

navobserver.observe(scrollwatcher);

// <!-- ============================================ -->
// <!--             Background Change                -->
// <!-- ============================================ -->

// Changes blog pages background on recent articles pages and the individual article page in regards to the url
document.addEventListener("DOMContentLoaded", function () {
    // Check the current URL
    checkURL();

    // Listen for changes in the URL (e.g., when navigating between pages)
    window.addEventListener("popstate", checkURL);
});

// Background changes for each blog post page
function checkURL() {
    // Get the current URL
    var currentURL = window.location.pathname;

    // Check if the URL starts with "/news/"
    if (currentURL.startsWith("/news/")) {
        // Apply the appropriate background color class to #main
        document.getElementById("main").classList.remove("black-bg");
        document.getElementById("main").classList.add("yellow-bg");
    } else {
        // Default background color for other pages
        document.getElementById("main").classList.remove("yellow-bg");
        document.getElementById("main").classList.add("black-bg");
    }
}

// Function to apply or remove classes based on screen width and URL structure
// Toggles article grid based on section page and page number as well as screen size
function applyClasses() {
    // Get the current URL
    var currentUrl = window.location.href;

    // Define your sections
    var sections = ["news", "milestones", "legends", "worldcups"];

    // Select the element to apply the class
    var contentContainer = document.querySelector(".main-content");

    // Check screen width
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Check if the screen width is greater than or equal to 1024 pixels
    if (screenWidth >= 1024) {
        // Check if the URL ends with just a section or starts with section/page-number
        if (sections.some((section) => currentUrl.endsWith("/" + section + "/")) || currentUrl.match(/\/(news|milestones|legends|worldcups)\/page-\d+/)) {
            // Apply the class for section-only URL or section/page-number URL
            contentContainer.classList.add("article-grid");
        } else {
            // If not matching the specified conditions, do nothing
        }
    } else {
        // Remove the "article-grid" class if the screen width is below 1024 pixels
        contentContainer.classList.remove("article-grid");
    }
}

// Call the function when the DOM is loaded
document.addEventListener("DOMContentLoaded", applyClasses);

// Call the function when the window is resized
window.addEventListener("resize", applyClasses);
