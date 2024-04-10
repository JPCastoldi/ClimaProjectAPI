const form = document.querySelector(".form");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "600eadc1916297c0e6d645963599b1ee";

form.addEventListener("submit", async event =>     {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const clima = await getClima(city)
            ClimaInfo(clima)

        }catch(error){
            console.error(error);
            erro(error);
        }
    }else{
        erro("Informe uma cidade");
    }

});

async function getClima(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Cidade não encontrada")
    }

    return await response.json();
}

function ClimaInfo(data){
    const {name: city,
        main:{temp, humidity}, 
        weather:[{description, id}]} = data;
    

    const tempC = temp - 273.15;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city
    cityDisplay.classList.add("nomeCity");
    tempDisplay.textContent = `${tempC.toFixed(1)}ºC`
    tempDisplay.classList.add("temp");
    humidityDisplay.textContent = `Umidade: ${humidity}%`
    humidityDisplay.classList.add("umi");
    descDisplay.textContent = description;
    descDisplay.classList.add("desc");
    weatherEmoji.textContent = getEmoji(id);
    weatherEmoji.classList.add("emoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);



}

function getEmoji(idClima){
    switch(true){
        case(idClima >= 200 && idClima < 300):
            return "⛈️";
        case(idClima >= 300 && idClima < 400):
            return "🌧️";
        case(idClima >= 500 && idClima < 600):
            return "🌧️";
        case(idClima >= 600 && idClima < 700):
            return "❄️";
        case(idClima >= 700 && idClima < 800):
            return "🌫️";
        case(idClima == 800):
            return "☀️";
        case(idClima >= 801  && idClima < 810):
            return "☁️";
        default:
            return "❔";
        
    }
}

function erro(msg){
    const errorMost = document.createElement("p");
    errorMost.textContent = msg;
    errorMost.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorMost);
}