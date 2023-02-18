import Dom from '../dom_controller'
import paintForecastPage from '../pages/forecast'
import OpenWeatherMap from '../open_weather_map'

export default function searchCityForm() {
  const cityForm = Dom.newElement('form', [], 'search-city')

  const cityInput = Dom.newElement('input', [], 'city-input')
  cityInput.setAttribute('type', 'text')
  cityInput.setAttribute('placeholder', 'London')
  cityInput.setAttribute('minlength', '1')
  cityInput.setAttribute('aria-label', 'City input')
  cityInput.setAttribute('required', 'true')

  const searchBtn = Dom.newElement('button', [], 'city-btn', 'SEarcH')
  searchBtn.setAttribute('aria-label', 'Search')

  cityForm.addEventListener('submit', (e) => {
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

  Dom.addChildrenTo(cityForm, [cityInput, searchBtn])

  return cityForm
}
