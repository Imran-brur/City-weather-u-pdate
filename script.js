const api = {
    key: "48bdb76563b9f80779eb7a87ea2fe862",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function(){
    const searchBox = document.getElementById('searchBox');
    getResults(searchBox.value);
    const weatherPart = document.getElementById('weatherPart');
    weatherPart.style.display = "block";
    const greeting = document.getElementById('greeting');
    greeting.style.display = "none";
    document.getElementById('searchBox').value = "";


})

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults)
    .catch(json =>{
        alert("Please Enter the valid City")
        forCatch(json)
    })
}
function displayResults(weather) {
    console.log(weather);
    const city = document.getElementById("city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    const date = document.getElementById('date');
    date.innerText = dateBuilder(now);

    const temp = document.getElementById('temp');
    temp.innerText = `${Math.round(weather.main.temp)}°c`;

    const weatherSituation = document.getElementById('weather');
    weatherSituation.innerText = weather.weather[0].main;

    const hiLow = document.getElementById('hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_max)}°c / ${Math.round(weather.main.temp_min)}°c`;
}

function dateBuilder (d) {
    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday","Wednesday", "ThursDay", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}



