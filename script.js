// 🌐 تنظیمات API
const API_KEY = "c5b83398195c080b95e1d4d6d29b9d15";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// 🎯 انتخاب عناصر DOM
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");
const weatherIcon = document.querySelector(".weather-icon");

// 📦 آیکون‌های وضعیت هوا
const weatherIcons = {
  Clouds: "clouds.png",
  Clear: "clear.png",
  Rain: "rain.png",
  Drizzle: "drizzle.png",
  Mist: "mist.png",
};

// 📊 نمایش اطلاعات هواشناسی
function displayWeather(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
  document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

  const iconFile = weatherIcons[data.weather[0].main] || "default.png";
  weatherIcon.src = `img/${iconFile}`;

  weatherSection.style.display = "block";
  errorSection.style.display = "none";
}

// 🚫 نمایش خطا در صورت عدم یافتن شهر
function showError() {
  errorSection.style.display = "block";
  weatherSection.style.display = "none";
}

// 🔍 دریافت اطلاعات از API
async function fetchWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) return showError();

    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    console.error("خطا در دریافت اطلاعات:", err);
    showError();
  }
}

// 🖱️ رویداد کلیک دکمه جستجو
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) fetchWeather(city);
});