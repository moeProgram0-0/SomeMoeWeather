const api = {
    key: "3c45e8a9f0e28def779e6aa22ff87af1",
    base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(weather => {
        displayResults(weather);
        setInterval(() => updateBackgroundIfRaining(weather), 15000);
    });
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    changeBackground(weather.main.temp);
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function changeBackground(temp) {
    let appOutline = document.querySelector('.app-outline');

    if (temp < 8) {
        appOutline.style.backgroundImage = "url('olafcold.gif')";
    } else if (temp >= 8 && temp <= 15) {
        appOutline.style.backgroundImage = "url('calm-city.gif')";
    } else if (temp >= 16 && temp <= 25) {  
        appOutline.style.backgroundImage = "url('warmest.gif')";
    } else if (temp >= 26 && temp <= 40) {  
        appOutline.style.backgroundImage = "url('hottest.gif')";
    } else if (temp > 40)
        appOutline.style.backgroundImage = "url('evenhotter.gif')";
    } else { 
        appOutline.style.backgroundImage = "url('p2j.gif')";   
    }
}

function updateBackgroundIfRaining(weather) {
    let appOutline = document.querySelector('.app-outline');
    let condition = weather.weather[0].main.toLowerCase();

    if (condition.includes('rain')) {
        appOutline.style.backgroundImage = "url('lonely-rain.gif')";
    }
}
