const apiKey = "3aa3a2cb3dd6592f0a55e97e114d9f3f";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerText = data.name;
      document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerText = data.main.humidity + "%";
      document.querySelector(".wind").innerText = data.wind.speed + " km/h";

      const weatherMain = data.weather[0].main;
      if (weatherMain === "Clouds") {
        weatherIcon.src = "clouds.png";
      } else if (weatherMain === "Clear") {
        weatherIcon.src = "clear.png";
      } else if (weatherMain === "Rain") {
        weatherIcon.src = "rain.png";
      } else if (weatherMain === "Drizzle") {
        weatherIcon.src = "drizzle.png";
      } else if (weatherMain === "Mist") {
        weatherIcon.src = "mist.png";
      } else {
        weatherIcon.src = "default.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
function updateDateDay() {
  const now = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[now.getDay()];

  const date = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  document.querySelector(".day").innerText = day;
  document.querySelector(".date").innerText = date;
}

updateDateDay();
