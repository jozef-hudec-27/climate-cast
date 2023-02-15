import './assets/styles/style.scss'
import OpenWeatherMap from './open_weather_map'
import Dom from './dom_controller'
import paintForecastPage from './pages/forecast'

paintForecastPage(51.5085, -0.1257) // London lat, lon

Dom.byId('search-city')?.addEventListener('submit', (e) => {
  e.preventDefault()

  OpenWeatherMap.geoCodingAPI(Dom.byId('city-input').value).then(async (cities) => {
    Dom.byId('cities').innerHTML = ''
    cities.forEach((city) => {
      let container = Dom.newElement('button', ['city'], '')
      let flag = Dom.newElement('img')
      flag.src = `https://www.countryflagicons.com/FLAT/24/${city.country.toUpperCase()}.png`
      flag.alt = `${city.country.toUpperCase()} flag`
      let heading = Dom.newElement('h2', [], '', city.name)

      container.addEventListener('click', () => {
        Dom.byId('cities').remove()
        Dom.byId('search-city').remove()
        paintForecastPage(city.lat, city.lon)
      })

      Dom.addChildrenTo(container, [flag, heading])
      Dom.byId('cities').appendChild(container)
    })
  })
})
