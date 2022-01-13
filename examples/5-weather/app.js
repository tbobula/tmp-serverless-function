// it takes few minutes

const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const alert = document.querySelector(".alert");
const result = document.querySelector(".result");
alert.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = input.value;
  if (city != "" && city.length >= 4) {
    getWeatherData(city);
  }
});

async function getWeatherData(city) {
  alert.style.display = "none";
  try {
    const { data } = await axios.post("/api/5_weather", { city });
    const { name } = data;
    const { description } = data.weather[0];
    const { country } = data.sys;
    const { temp, temp_min, temp_max, feels_like } = data.main;

    result.innerHTML = `
    <article class="card">
        <h3>${name}, ${country}</h3>
        <p>${description}</p>
        <p>min temp: ${temp_min}&#176C</p>
        <p>max temp: ${temp_max}&#176C</p>
        <p>feels temp: ${feels_like}&#176C</p>
      </article>
    `;
  } catch (error) {
    alert.style.display = "block";
    alert.textContent = JSON.stringify(error);
  }
}
