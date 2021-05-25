const cityName = document.querySelector("#cityName");
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", async ()=>{
    const enteredCityName = cityName.value;
    const weather = await getWeather(enteredCityName);
    generateHTML(weather);
})

const getPic = async(cityName)=>{
    const URL = `https://api.unsplash.com/search/photos?client_id=B3yuwNjKCYkDyAjFNuejHgmbzQO681_BH8G5TH3axIg&page=1&query=${cityName}&per_page=1`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}



const generateHTML = async data=>{
    const container = document.querySelector(".tempContainer");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("infoContainer");
    const h3 = document.createElement("h3");
    h3.innerText = data.name;
    const p_temp = document.createElement("p");
    p_temp.classList.add("p1");
    p_temp.innerText = data.fahrenheit + "°";
    const p_description = document.createElement("p");
    p_description.classList.add("p2");
    p_description.innerText = data.description;
    const image = document.createElement("img");
    const imgData = await getPic(data.name)
    image.setAttribute("src", `${imgData.results[0].urls.regular}`);

    infoContainer.appendChild(h3);
    infoContainer.appendChild(p_temp);
    infoContainer.appendChild(p_description);
    container.appendChild(infoContainer);
    container.appendChild(image);
}


const getWeather = async(city)=>{
    const API_KEY = "bf43c070874e2007087bc1968f6e64e3";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(URL);
    const data = await response.json();

    const weatherData = {};


    const cityName = data.name;
    const weather = data.weather[0];

    const description = formatDescription(weather.description);
    const fahrenheitTemp = `${Math.floor(data.main.temp * 9 / 5 - 459.67)}`;

    weatherData["name"] = cityName;
    weatherData["description"] = description;
    weatherData["fahrenheit"] = fahrenheitTemp;
    return weatherData;
}

const formatDescription = (description)=>{

    const newDescription = [];
    const desc = description.split(" ");
    for(let i = 0; i < desc.length; i++){
        const firstLetter = desc[i].slice(0, 1);
        const remaining = desc[i].slice(1);
        const formattedWord = firstLetter.toUpperCase() + remaining;
        newDescription.push(formattedWord);
    }
    return newDescription.join(" ");
}


