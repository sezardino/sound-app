import Slider from "./modules/slider.js";

document.addEventListener("DOMContentLoaded", () => {
  new Slider({
    container: ".slider",
    arrows: true,
    prev: ".slider-btn--prev",
    next: ".slider-btn--next",
  });
});
