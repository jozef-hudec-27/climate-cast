import './assets/styles/style.scss'
import OpenWeatherMap from './open_weather_map'
import Dom from './dom_controller'

Dom.byId('search-city').addEventListener('submit', (e) => {
  e.preventDefault()

  OpenWeatherMap.geoCodingAPI(Dom.byId('city-input').value).then(async (cities) => {
    Dom.byId('cities').innerHTML = ''
    cities.forEach((city) => {
      let container = Dom.newElement('div', ['city'], '')
      let heading = Dom.newElement('h2', [], '', city.name)
      container.appendChild(heading)
      Dom.byId('cities').appendChild(container)
    })
  })
})
