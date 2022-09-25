
const cityInput = document.querySelector("#input");
const btnSubmit = document.querySelector("#submit");
const header = document.querySelector("header");
const weatherDiv = document.querySelector(".weather-content");
const warningText = document.getElementById("warning-text")

const API_KEY = "9a6c58097c1634ecf28c8895c5827ca1"

let cities = [];
 

const getWeather = function(cityName){

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(url).then((res) =>{

        if(!res.ok){
            renderError()
            throw new Error(`Weather could not be fetched! : ${res.status}`)
        }
        return res.json();
    }).then((data) => renderWeather(data)).catch(err => console.log(err))

}


const renderWeather = function(data){
    // console.log(data)
    const {name, sys:{country}, main:{temp}, weather} = data;

    if(!cities.includes(name)){
        cities.push(name);
        weatherDiv.innerHTML += `
    <div class="col-md-6">
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${name} <span class="bg-warning border rounded-pill">${country}</span></h5>
                    <p class="card-text">${Math.round(temp)}°C</p>
                    <p class="card-text text-muted">${
                      weather[0].description
                    }</p>
                </div>
            </div>
        </div>
    </div>
</div>`;
    }else{
        warningText.textContent = `You already know the weather condition for ${name}. Pls search for another city`;
        setTimeout(()=>{
            warningText.textContent="";
        },1500)
    }
    

    // console.log(weather[0]["description"])  

    
}


btnSubmit.addEventListener("click", ()=>{

    getWeather(cityInput.value);
    cityInput.value = "";
});

function renderError(){
    header.style.display = "none";
    weatherDiv.innerHTML =` <h2>Searched city's weather could not be fetched</h2>`;
}