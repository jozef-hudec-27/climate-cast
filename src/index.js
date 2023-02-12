import './assets/styles/style.scss'
import OpenWeatherMap from './open_weather_map'

OpenWeatherMap.geoCodingAPI('London').then(async cities => {
  let { lat, lon } = cities[0]

  const weatherData = await OpenWeatherMap.weatherForecastAPI(lat, lon)
  console.log(weatherData)
})
