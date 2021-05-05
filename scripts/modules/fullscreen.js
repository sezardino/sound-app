class Fullscreen {
    constructor(props) {
        this.props = props;

        this.init();
    }

    hideElements() {
        const wrapperChildren = Array.from(this.showWrapper.children);
        wrapperChildren.map((item) => {
            item.classList.add("fullscreen-element");
            if (item === this.showOnly) {
                item.classList.add("fullscreen--100");
            } else {
                item.classList.add("fullscreen--hide");
            }
        });
    }

    showElements() {
        const wrapperChildren = Array.from(this.showWrapper.children);
        wrapperChildren.map((item) => {
            if (item === this.showOnly) {
                item.classList.remove("fullscreen--100");
            } else {
                item.classList.remove("fullscreen--hide");
            }
        });
    }

    addListeners() {
        this.trigger.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                if (this.showOnly) {
                    this.hideElements();
                }
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
                if (this.showOnly) {
                    this.showElements();
                }
            }
        });
    }

    init() {
        this.trigger = document.querySelector(this.props.trigger);
        this.showOnly = this.props.hide
            ? document.querySelector(this.props.showComponent)
            : null;
        this.showWrapper = this.props.hide
            ? document.querySelector(this.props.showWrapper)
            : null;

        this.addListeners();
    }
}

export default Fullscreen;
