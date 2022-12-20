window.onload = function () {
  let days = [
    "Sunay",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weatherEmojis = ["🌨", "🌤", "☀️", "🌦", "🌩", "☁️", "🌥", "🌥", "☁️", "❄️"];
  let now = new Date();
  let dayOfWeek = document.querySelector("#day-of-week");
  dayOfWeek.innerHTML = days[now.getDay()];

  let timeNow = document.querySelector("#time-now");
  timeNow.innerHTML = `${now.getHours()}:${now.getMinutes()}`;

  let searchInput = document.querySelector("#search-input-text");
  let currentCity = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let form = document.querySelector("#search-form");
  let weatherDescription = document.querySelector("#weather-description");

  // Weather Api use
  let apiKey = "674591194bee5b51429e42ecb8764bef";

  //fetch data from apiUrl
  function setTemprature(city, currentTemp) {
    let cityTemp;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
    axios.get(apiUrl).then((response) => {
      cityTemp = Math.round(response.data.main.temp);
      currentTemp.innerHTML = cityTemp;
      weatherDescription.innerHTML = response.data.weather[0].description;
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchInput.value !== "" || null) {
      let currentTempNumber = parseFloat(currentTemp.innerHTML);
      currentCity.innerHTML = searchInput.value;
      setTemprature(searchInput.value, currentTemp);
      let currentEmoji = document.querySelector("#current-emoji");
      currentEmoji.innerHTML = weatherEmojis[Math.floor(Math.random() * 10)];
      searchInput.value = "";
    }
  });
  // //fetch current location weather data
  let currentBtn = document.querySelector("#current-btn");
  currentBtn.addEventListener("click", () => {
    let currentTemp = document.querySelector("#current-temp");
    let currentCity = document.querySelector("#current-city");
    navigator.geolocation.getCurrentPosition((position) => {
      let lati = position.coords.latitude;
      let long = position.coords.longitude;
      myLocApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${apiKey}`;
      axios.get(myLocApi).then((response) => {
        currentTemp.innerHTML = Math.round(response.data.main.temp);
        currentCity.innerHTML = response.data.name;
        weatherDescription.innerHTML = response.data.weather[0].description;
      });
    });
  });

  function changeUnit(event) {
    let currentTemp = document.querySelector("#current-temp");
    let currentTempNumber = parseFloat(currentTemp.innerHTML);
    // event.preventDefault();
    if (fDegree.classList.contains("disabled")) {
      fDegree.classList.remove("disabled");
      fDegree.classList.add("text-primary");
      cDegree.classList.add("disabled");
      cDegree.classList.remove("text-primary");
      // f to c:
      currentTempNumber = (((currentTempNumber - 32) * 5) / 9).toFixed();
      currentTemp.innerHTML = currentTempNumber.toString();
      console.log(currentTempNumber);
    } else if (cDegree.classList.contains("disabled")) {
      cDegree.classList.remove("disabled");
      cDegree.classList.add("text-primary");
      fDegree.classList.add("disabled");
      fDegree.classList.remove("text-primary");
      // c to f
      currentTempNumber = ((currentTempNumber * 9) / 5 + 32).toFixed();
      currentTemp.innerHTML = currentTempNumber.toString();
    }
  }

  let cDegree = document.querySelector("#c-degree");
  let fDegree = document.querySelector("#f-degree");
  cDegree.addEventListener("click", changeUnit);
  fDegree.addEventListener("click", changeUnit);
};
