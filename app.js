let input = document.querySelector("#city_input");
let tempdisp = document.querySelector("#a");
let tempdisp1 = document.querySelector("#b");
let tempdisp2 = document.querySelector("#c");
let tempdisp3 = document.querySelector("#d");
let tempdisp4 = document.querySelector("#e");
let tempdisp5 = document.querySelector("#f");
let dispname = document.querySelector("p");
let hourhead = document.querySelector(".hour_head");

let a1 = document.querySelector("#a1");
let b1 = document.querySelector("#b1");
let c1 = document.querySelector("#c1");
let d1 = document.querySelector("#d1");
let e1 = document.querySelector("#e1");
let f1 = document.querySelector("#f1");
let g1 = document.querySelector("#g1");
let h1 = document.querySelector("#h1");
let i1 = document.querySelector("#i1");
let j1 = document.querySelector("#j1");
let k1 = document.querySelector("#k1");
let l1 = document.querySelector("#l1");
let m1 = document.querySelector("#m1");
let n1 = document.querySelector("#n1");
let o1 = document.querySelector("#o1");
let p1 = document.querySelector("#p1");
let q1 = document.querySelector("#q1");
let r1 = document.querySelector("#r1");
let s1 = document.querySelector("#s1");
let t1 = document.querySelector("#t1");
let u1 = document.querySelector("#u1");
let v1 = document.querySelector("#v1");
let w1 = document.querySelector("#w1");
let x1 = document.querySelector("#x1");

let span1 = document.querySelector("span");

let url1;
let city;
let btn = document.querySelector("#btn");

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    city = input.value || "Bhubaneswar";
    main();
});

const main = () => {
    url1 = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    start2();
};

let url;
const start2 = async () => {
    try {
        span1.innerText = "";
        let response1 = await fetch(url1);
        let data1 = await response1.json();

        if (!data1.results || data1.results.length === 0) {
            span1.innerText = "City not found or check your Internet Connection";
            return;
        }

        hourhead.innerText = `Weather in the last 24 hours in ${city}`;
        dispname.innerText = `WEATHER FOR ${city.toUpperCase()}`;

        let lat = data1.results[0].latitude;
        let lon = data1.results[0].longitude;

        url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,wind_speed_10m_max&timezone=auto&windspeed_unit=kmh`;
        start();
    } catch (error) {
        span1.innerText = "City not found or check your Internet Connection";
    }
};

let data;
const start = async () => {
    let response = await fetch(url);
    data = await response.json();

    tempdisp.innerText = `${data.current_weather.temperature} °C`;
    tempdisp1.innerHTML = `Current: ${data.current_weather.temperature} °C<br>Min: ${data.daily.temperature_2m_min[0]} °C<br>Max: ${data.daily.temperature_2m_max[0]} °C`;

    let wet_code = data.daily.weathercode[0];
    if (wet_code == 0) {
        tempdisp2.innerText = "Clear sky";
    } else if (wet_code == 1 || wet_code == 2 || wet_code == 3) {
        tempdisp2.innerText = "Mainly clear, partly cloudy, and overcast";
    } else {
        tempdisp2.innerText = "Fog and depositing rime fog";
    }
    tempdisp3.innerHTML = `Sunrise at ${data.daily.sunrise[0]}<br>Sunset at ${data.daily.sunset[0]}`;

    tempdisp4.innerText = `${data.current_weather.windspeed} km/h`;
    tempdisp5.innerHTML = `Wind Direction: ${data.current_weather.winddirection}°<br>Max Wind Speed: ${data.daily.wind_speed_10m_max[0]} km/h`;

    let temps = data.hourly.temperature_2m;
    let hourlyBoxes = [a1,b1,c1,d1,e1,f1,g1,h1,i1,j1,k1,l1,m1,n1,o1,p1,q1,r1,s1,t1,u1,v1,w1,x1];
    for(let i=0; i<24; i++){
        hourlyBoxes[i].innerText = temps[i] + "°C";
    }
}

window.addEventListener("load", () => {
    city = "Bhubaneswar";
    main();
});
