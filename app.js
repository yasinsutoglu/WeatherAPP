
const cityInput = document.querySelector("#input");
const btnSubmit = document.querySelector("#submit");
const header = document.querySelector("header");
const weatherDiv = document.querySelector(".weather-content");
const warningText = document.getElementById("warning-text")

const API_KEY = "9a6c58097c1634ecf28c8895c5827ca1"

let cities = [];

btnSubmit.addEventListener("click", ()=>{

    if(!cityInput.value){
        warningText.innerText = "Please enter a city";
        setTimeout(()=>{
            warningText.innerText = "";
        },2000)
    }else{
        getWeather(cityInput.value);
        cityInput.value = "";
    }
    
});



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

    if(cities.includes(name)){
        warningText.textContent = `You already know the weather condition for ${name}. Pls search for another city`;
        setTimeout(() => {
          warningText.textContent = "";
        }, 2000);
    }else if(cities.length>=6){
        warningText.textContent = `You cannot add more than 6 cities `;
        setTimeout(() => {
          warningText.textContent = "";
        }, 2000);
    }else{
        cities.push(name);
        weatherDiv.innerHTML += `
    <div class="col-sm-6 col-lg-4">
        <div class="card mb-3">
        <div class="row g-0">
            <div class="col-3 d-flex align-items-center justify-content-center">
                <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>
            </div>
            <div class="col-9">
                <div class="card-body">
                    <h5 class="card-title fs-5 fw-bold">${name} <span class="bg-warning p-1">${country}</span></h5>
                    <p class="card-text fs-1 mt-1">${Math.round(temp)}°C</p>
                    <p class="card-text text-muted fs-5">${weather[0].description}</p>
                </div>
            </div>
        </div>
    </div>
</div>`;
    }   
    
}

function renderError() {
  warningText.innerText = `Please enter a valid city`;
  setTimeout(() => {
    warningText.innerText = "";
  }, 3000);
}


cityInput.addEventListener("keydown" , (e)=>{
    if(e.code === "Enter"){
        btnSubmit.click();
    }
})


window.addEventListener("load", ()=>{
    cityInput.focus();
})