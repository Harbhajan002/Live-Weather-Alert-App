const btn=document.getElementById("btn");
const input=document.getElementById("search");
const condition_img=document.querySelector(".condition_img")
console.log(input);

async function checkWeather(city) {
    
apikey="5d65ed19e75e034fbbcd5d02ccbe845c"
apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response =await fetch(apiurl );
    var data= await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp -273.15)  +"<sup>°</sup>C";
    document.querySelector("#wind_data").innerHTML=data.wind.speed + " km/h";
    document.querySelector(".description").innerHTML=data.weather[0].description;
    document.querySelector("#humidity_data").innerHTML=data.main.humidity +" %";
    document.querySelector(".country").innerHTML=data.sys.country  ;

    
    if (data.weather[0].main="clear") {
        condition_img.src="/images/clear.png";
    }  else if(data.weather[0].main="cloud") {
        condition_img.src="/images/clouds.png"; 
    }
    else if(data.weather[0].main="drizzle") {
        condition_img.src="/images/drizzle.png"; 
    }
    else if(data.weather[0].main="mist") {
        condition_img.src="/images/mist.png"; 
    }
    else if(data.weather[0].main="snow") {
        condition_img.src="/images/snow.png"; 
    }
input.value="";
let weather=document.querySelector(".weather").style.display="block";
console.log(weather);
}
input.addEventListener("click",()=>{
    checkWeather(input.value);
    console.log(input.value);
})