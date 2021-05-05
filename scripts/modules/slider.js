class Slider {
    constructor(props) {
        this.container = document.querySelector(props.container);
        this.wrapper = this.container.querySelector(".slider-wrapper");
        this.slides = this.container.querySelectorAll(".slider-slide");
        this.arrows = props.arrows;
        this.props = props;

        this.currentTransition = 0;
        this.activeSlide = 0;

        this.init();
    }

    changeTransition() {
        const sign = -1;
        this.currentTransition =
            this.wrapper.clientWidth * this.activeSlide * sign;
        this.wrapper.style.transform = `translateX(${this.currentTransition}px)`;
    }

    changeSlide() {
        this.changeTransition();

        if (this.activeSlide === 0) {
            this.prev.setAttribute("disabled", true);
            this.next.removeAttribute("disabled");
        } else if (this.activeSlide === this.slides.length - 1) {
            this.next.setAttribute("disabled", true);
            this.prev.removeAttribute("disabled");
        } else {
            this.prev.removeAttribute("disabled");
            this.next.removeAttribute("disabled");
        }
    }

    addArrowListeners() {
        this.next.addEventListener("click", () => {
            this.activeSlide += 1;
            this.changeSlide(true);
        });
        this.prev.addEventListener("click", () => {
            this.activeSlide -= 1;
            this.changeSlide(false);
        });
        document.addEventListener("fullscreenchange", () => {
            const interval = setInterval(() => {
                this.changeTransition();
            });
            setTimeout(() => clearInterval(interval), 1000);
        });
    }

    init() {
        if (this.arrows) {
            this.next = document.querySelector(this.props.next);
            this.prev = document.querySelector(this.props.prev);
            this.addArrowListeners();
        }
    }
}

export default Slider;
