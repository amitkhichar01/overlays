//Bootstrap js lines
(() => {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

function showDesktopMenu() {
    function showDesktopMenu(menu) {
        menu.style.display = "flex";
    }

    function hideDesktopMenu(menu) {
        menu.style.display = "none";
    }

    const showMenuItems = document.querySelectorAll(".show-menu");
    showMenuItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            const menuId = item.getAttribute("data-menu-id");
            const desktopMenu = document.getElementById(menuId);
            showDesktopMenu(desktopMenu);
        });

        item.addEventListener("mouseleave", () => {
            const menuId = item.getAttribute("data-menu-id");
            const desktopMenu = document.getElementById(menuId);
            hideDesktopMenu(desktopMenu);
        });
    });
}
showDesktopMenu();

const sliderIcon = document.querySelector(".slider-icon");
const navBag = document.querySelector(".nav-bag-icon");
const navSlider = document.querySelector(".nav-slider");

sliderIcon.addEventListener("click", () => {
    navSlider.style.display = "none";
});

navSlider.addEventListener("mouseleave", () => {
    navSlider.style.display = "none";
});

navBag.addEventListener("click", () => {
    navSlider.style.display = "inline-flex";
});

const flashMsg = document.querySelector(".flash-msg");

if (flashMsg) {
    setTimeout(() => {
        flashMsg.style.display = "none";
    }, 10000);

    flashMsg.addEventListener("click", () => {
        flashMsg.style.display = "none";
    });
}

function redirectToShow(productId) {
    window.location.href = "/collections/show/" + productId;
}

function addClickEventToElements(selector) {
    let elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.addEventListener("click", function () {
            var productId = element.id;
            redirectToShow(productId);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    addClickEventToElements(".home-jacket-box");
});

document.addEventListener("DOMContentLoaded", function () {
    addClickEventToElements(".product");
});

document.addEventListener("DOMContentLoaded", function () {
    addClickEventToElements(".related-product");
});

function toggleMenu() {
    let button = document.querySelector(".menu");
    button.classList.toggle("opened");
    button.setAttribute("aria-expanded", button.classList.contains("opened"));

    let navLink = document.querySelector("#nav-link");

    let screenWidth = window.innerWidth;

    if (screenWidth > 1000) {
        navLink.style.display = "flex";
    }
    navLink.style.display = button.classList.contains("opened") ? "flex" : "none";
}
