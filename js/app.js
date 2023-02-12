const changeLocation = document.getElementById('change-location');
const card = document.getElementById('card');
const details = document.getElementById('details');
const weatherIcon = document.getElementById('weather-icon');
const overlay = document.getElementById('overlay');

// Loader
function loader(state) {
    state ? overlay.classList.remove('d-none') : overlay.classList.add('d-none');
}

// update UI
const getWeather = async (city) => await getData(city);

changeLocation.addEventListener('submit', e => {
    e.preventDefault();
    const inp = changeLocation.city.value.trim();   // Take for name

    if (inp == '') {
        alert('Write any location');
        return;
    }

    getWeather(inp).then((data) => {
        if (data.message) {
            alert(data.message);
            return;
        }
        card.classList.remove('d-none');
        card.children[1].children[0].innerHTML = `${data.name}, ${data.sys.country}`;
        card.children[1].children[1].innerHTML = data.weather[0].main;
        card.children[1].children[2].children[0].innerHTML = Math.round(data.main.temp)

        card.children[0].children[0].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })

    changeLocation.reset();
})