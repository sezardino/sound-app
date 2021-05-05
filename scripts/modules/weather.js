class Weather {
    constructor(props) {
        this.wrapper = document.querySelector(props.wrapper);
        this.form = this.wrapper.querySelector(".weather-form");
        this.inner = this.wrapper.querySelector(".weather-inner");

        this.form.querySelector("input").value =
            localStorage.getItem("city") !== "undefined"
                ? localStorage.getItem("city")
                : "Warsaw";

        this.weatherTemp = this.inner.querySelector(".weather-temp");
        this.weatherIcon = this.inner.querySelector(".weather-icon");
        this.weatherString = this.inner.querySelector(".weather-appearance");
        this.windIcon = this.inner.querySelector(".weather-wind");
        this.windSpeed = this.inner.querySelector(".weather-speed");
        this.windDirection = this.inner.querySelector(".weather-direction");

        this.init();
    }

    displayData(data) {
        const iconClass = `weather-icon owf owf-${data.weather[0].id}`;

        this.inner.classList.remove("hidden");
        this.weatherIcon.className = iconClass;
        this.weatherString.textContent = data.weather[0].description;
        this.weatherTemp.textContent = Math.round(data.main.temp);

        this.windIcon.style.transform = `rotate(${data.wind.deg}deg)`;
        this.windSpeed.textContent = data.wind.speed;
    }

    async request(value) {
        let query;
        if (!value && localStorage.getItem("city") === "undefined") {
            query = "warsaw";
        } else if (value) {
            query = value;
        } else if (localStorage.getItem("city") !== "undefined") {
            query = localStorage.getItem("city");
        }
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=3197999da6519518237b84ffaa787599`
        );

        if (response.ok) {
            this.displayData(await response.json());
            localStorage.setItem("city", value);
        } else {
            throw new Error(response.statusText);
        }
    }

    startTimeout(value) {
        this.timeout = setTimeout(() => {
            this.timeout = null;
            if (value.length >= 4 && value !== this.requestValue) {
                this.requestValue = value;
                this.request(this.requestValue);
            }
        }, 2000);
    }

    addListeners() {
        this.form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this.form.addEventListener("input", (evt) => {
            const value = evt.target.value;
            if (!this.timeout) {
                this.startTimeout(value);
            } else {
                clearTimeout(this.timeout);
                this.startTimeout(value);
            }
        });
    }

    init() {
        this.request();
        this.addListeners();
    }
}

export default Weather;
