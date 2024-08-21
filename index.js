const input = document.getElementById("search");
const number = document.getElementById("number");
const condition_img = document.querySelector(".condition_img");
let weather = document.querySelector(".weather");
let notfound = document.querySelector(".notfound");
const backview = document.querySelector(".backview");
const loc = document.querySelector("#loc");

const apiLoctionUrl = "https://api.opencagedata.com/geocode/v1/json";
const apiLoctionKey = "1af8b8151f524544b523b3d363760206";

let currentCity = '';

const getUserCurrentLocation = async (latitude, longitude) => {
    let query = `${latitude},${longitude}`;
    console.log("query", query);

    let apiUrl = `${apiLoctionUrl}?key=${apiLoctionKey}&q=${query}&pretty=1`;
    try {
        const res = await fetch(apiUrl);
        const dataLocation = await res.json();
        const { city, state, postcode, country } = dataLocation.results[0].components;
        console.log(dataLocation.results[0].formatted);
        console.log(dataLocation.results[0].components);
        input.value = `${state}`;
        
        // Store the city globally to use for comparison
        currentCity = city;
        loc.textContent = `Current Loc: ${city},  ${state}, ${country}`;
        checkWeather(input.value);
    } catch (error) {
        console.log(error);
    }
}

// Get current latitude and longitude
const getCurrLoc = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getUserCurrentLocation(latitude, longitude);
            },
            function(error) {
                console.error("Error getting location:", error);
            }
        );
    }
}
getCurrLoc();

async function checkWeather(city) {
    const apikey = "5d65ed19e75e034fbbcd5d02ccbe845c";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try {
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log("data", data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.15) + "<sup>°</sup>C";
        document.querySelector("#wind_data").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector("#humidity_data").innerHTML = data.main.humidity + " %";
        document.querySelector("#visibility").innerHTML = data.visibility / 100 + " %";
        document.querySelector(".country").innerHTML = data.sys.country;

        const sunriseTime = data.sys.sunrise * 1000;
        const sunsetTime = data.sys.sunset * 1000;

        function convertTimeToHours(timestamp) {
            const date = new Date(timestamp);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }

        const formattedSunrise = convertTimeToHours(sunriseTime);
        const formattedSunset = convertTimeToHours(sunsetTime);

        document.querySelector("#sunrise").innerHTML = formattedSunrise;
        document.querySelector("#sunset").innerHTML = formattedSunset;

        if (data.weather[0].main === "Clear") {
            condition_img.src = "/images/clear.png";
            backview.style.backgroundImage = 'url("./images/clear-bg.jfif")';
        } else if (data.weather[0].main === "Clouds") {
            condition_img.src = "/images/clouds.png";
            backview.style.backgroundImage = 'url("./images/cloud-bg.jpg")';
        } else if (data.weather[0].main === "Haze") {
            condition_img.src = "/images/haze.png";
            backview.style.backgroundImage = 'url("./images/haze-bg.jpg")';
        } else if (data.weather[0].main === "Mist") {
            condition_img.src = "/images/mist.png";
        } else if (data.weather[0].main === "Snow") {
            condition_img.src = "/images/snow.png";
        } else if (data.weather[0].main === "Rain") {
            condition_img.src = "/images/rain.png";
            backview.style.backgroundImage = 'url("./images/rain-bg.jpg")';
        } else if (data.weather[0].main === "Thunderstorm") {
            condition_img.src = "/images/thunderstone.png";
            backview.style.backgroundImage = 'url("./images/thunderstone-bg.jpg")';
        }

        weather.style.display = "block";
        notfound.style.display = "none";

    } catch (error) {
        weather.style.display = "none";
        notfound.style.display = "block";
        notfound.innerHTML = "Data not found.";
    }
}

input.addEventListener("keyup", () => {
    if (input.value.trim() !== "") {
        if (input.value === currentCity) {
            loc.style.display = "block";
        } else {
            loc.style.display = "none";
         document.getElementById('popup').classList.add('show');

            console.log("popup"+popup);
        }
        checkWeather(input.value);
    } else {
        loc.style.display = "none";
    }
});



document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').classList.remove('show');
});
let unum = '';
// Close popup when clicking outside of it
document.getElementById('receiveNumber').addEventListener('click', function() {
    document.getElementById('popup').classList.remove('show');
    unum = number.value;
    if (!(number.value == '')) {
        console.log("number have same value");

    }
    console.log(number.value);
    number.value="";
});
