const input = document.getElementById("search");
const condition_img = document.querySelector(".condition_img");
let weather = document.querySelector(".weather");
let notfound = document.querySelector(".notfound");
const backview = document.querySelector(".backview");
const loc = document.querySelector("#loc");


    const apiLoctionUrl = "https://api.opencagedata.com/geocode/v1/json";
    const apiLoctionKey ="1af8b8151f524544b523b3d363760206";
     
    const getUserCurrentLoction = async ( latitude, longitude)=>{
        
        let query = `${latitude},${longitude}`;
        console.log("query",query);
        
        let apiUrl = `${apiLoctionUrl}?key=${apiLoctionKey}&q=${query}&pretty=1`;
        try {
            const res = await fetch(apiUrl);
            const dataLocation = await res.json();
            const {city, state, postcode, country}=  dataLocation.results[0].components;
            console.log(dataLocation.results[0].formatted);
            
            loc.textContent = `user address ${dataLocation.results[0].formatted}`
        } catch (error) {
            console.log(error);
            
        }
    }

    // get current long , lati
    if ( navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              
              getUserCurrentLoction(latitude, longitude)
            },
            function(error) {
              console.error("Error getting location:", error);
            }
          );
    }
     

    async function checkWeather(city) {
        const apikey = "5d65ed19e75e034fbbcd5d02ccbe845c";
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try {
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log("data",data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.15) + "<sup>°</sup>C";
        document.querySelector("#wind_data").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector("#humidity_data").innerHTML = data.main.humidity + " %";
        document.querySelector(".country").innerHTML = data.sys.country;
        console.log("main :" + data.weather[0].main, "description: " + data.weather[0].description);

        if (data.weather[0].main === "Clear") {
            condition_img.src = "/images/clear.png";
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
        }

        weather.style.display = "block";
        notfound.style.display = "none";

    } catch (error) {
        weather.style.display = "none";
        notfound.style.display = "block";
        notfound.innerHTML = "data not found.";
    }
}

input.addEventListener("keyup", () => {
    if (input.value.trim() !== "") {
        checkWeather(input.value);
    }
});
