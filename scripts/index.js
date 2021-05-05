import Slider from "./modules/slider.js";
import Fullscreen from "./modules/fullscreen.js";

document.addEventListener("DOMContentLoaded", () => {
    new Slider({
        container: ".slider",
        arrows: true,
        prev: ".slider-btn--prev",
        next: ".slider-btn--next",
    });
    new Fullscreen({
        trigger: ".js-fullscreen",
        hide: true,
        showWrapper: ".main",
        showComponent: ".slider",
    });
});
