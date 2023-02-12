import './assets/styles/style.scss'
import OpenWeatherMap from './open_weather_map'
import Dom from './dom_controller'

const cityInput = Dom.newElement('input')
const cityLabel = Dom.newElement('label', [], '', 'City:')
cityLabel.appendChild(cityInput)

const searchBtn = Dom.newElement('button', [], '', 'Search')
searchBtn.addEventListener('click', () => {
  OpenWeatherMap.geoCodingAPI(cityInput.value).then(async (cities) => {
    document.getElementById('cities').innerHTML = ''
    cities.forEach((city) => {
      let container = Dom.newElement('div', ['city'], '')
      let heading = Dom.newElement('h2', [], '', city.name)
      container.appendChild(heading)
      document.getElementById('cities').appendChild(container)
    })
  })
})

document.body.appendChild(cityLabel)
document.body.appendChild(searchBtn)
