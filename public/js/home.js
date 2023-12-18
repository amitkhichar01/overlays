const bannerOne = document.querySelector("#banner-one");
const bannerTwo = document.querySelector("#banner-two");
const bannerThree = document.querySelector("#banner-three");
const bannerFour = document.querySelector("#banner-four");

function updateBannerImage() {
    if (window.innerWidth <= 650) {
        bannerOne.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner01_mobile.png?v=1699099615";
        bannerTwo.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner_02_mobile.jpg?v=1699099581";
        bannerThree.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner03-mobile.jpg?v=1699100953";
        bannerFour.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner_04_mobile.jpg?v=1699100968";
    } else {
        bannerOne.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner01-dekstop.jpg?v=1699099586";
        bannerTwo.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner02-dekstop.jpg?v=1699099589";
        bannerThree.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner03-dekstop.jpg?v=1699100953";
        bannerFour.src =
            "https://cdn.shopify.com/s/files/1/0566/0839/1368/files/banner04-dekstop.jpg?v=1699100958";
    }
}

updateBannerImage();
window.addEventListener("resize", updateBannerImage);
const scrollerContainer = document.querySelector(".home-jackets-section");
const scroller = document.querySelector(".home-jackets-container");
let currentTranslateX = 0;
let isScrolling = false;
const originalDuration = 10;
const scrollPercentage = 0.1; // 10%
const animationStyle = `jacketScroller ${originalDuration}s linear infinite`;

function restartAnimation() {
    scroller.style.animation = animationStyle;
    currentTranslateX = 0;
    scroller.style.transform = `translateX(-${currentTranslateX}px)`;
}

scrollerContainer.addEventListener("wheel", function (event) {
    event.preventDefault();
    scroller.style.animation = "none";

    currentTranslateX +=
        event.deltaY > 0
            ? scroller.offsetWidth * scrollPercentage
            : -scroller.offsetWidth * scrollPercentage;

    currentTranslateX = Math.max(
        0,
        Math.min(currentTranslateX, scroller.scrollWidth - scrollerContainer.clientWidth)
    );
    scroller.style.transform = `translateX(-${currentTranslateX}px)`;
});

scrollerContainer.addEventListener("mouseenter", function () {
    scroller.style.animationPlayState = "paused";
});

scroller.addEventListener("animationiteration", restartAnimation);

scrollerContainer.addEventListener("mouseleave", function () {
    scroller.style.animationPlayState = "running";
    restartAnimation();
});

restartAnimation();

gsap.from("#nav-bar", {
    y: -100,
    opacity: 0,
    duration: 1.2,
});

gsap.from("#hero-image", {
    x: -100,
    opacity: 0,
    duration: 1,
    scale: 1.5,
});

gsap.from(".benefit-section", {
    x: -100,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
        trigger: ".benefit-section",
        scroller: "body",
        end: "top 70%",
        scrub: 2,
    },
});

gsap.from(".banner-img", {
    opacity: 0,
    duration: 1,
    scale: 0.5,
    scrollTrigger: {
        trigger: ".banner-img",
        scroller: "body",
        end: "top 70%",
        scrub: 2,
    },
});

gsap.from(".instagram-img-box div", {
    opacity: 0,
    duration: 1,
    scale: 0.5,
    scrollTrigger: {
        trigger: ".instagram-img-box div",
        scroller: "body",
        end: "top 70%",
        scrub: 2,
    },
});
