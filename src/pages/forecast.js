import Chart from 'chart.js/auto'
import Dom from '../dom_controller'
import OpenWeatherMap from '../open_weather_map'
import { format } from 'date-fns'

export default async function paintForecastPage(lat, lon, unit = 'metric') {
  const unitRadioContainer = Dom.newElement('div', [], 'unit-radio-container')
  const units = [
    ['celsius', 'metric'],
    ['fahrenheit', 'imperial'],
  ]
  units.forEach((u) => {
    let unitWrapper = Dom.newElement('div', ['unit-wrapper'])
    let inp = Dom.newElement('input', [], u[0])
    inp.type = 'radio'
    inp.value = u[1]
    inp.name = 'unit'
    if (u[1] === unit) inp.setAttribute('checked', true)
    inp.addEventListener('click', () => {
      Dom.byId('charts').remove()
      Dom.byId('unit-radio-container').remove()
      paintForecastPage(lat, lon, u[1])
    })
    let label = Dom.newElement('label', [], '', u[0])
    label.setAttribute('for', u[0])
    Dom.addChildrenTo(unitWrapper, [inp, label])

    unitRadioContainer.appendChild(unitWrapper)
  })

  const charts = Dom.newElement('section', [], 'charts')

  Dom.addChildrenTo(document.body, [unitRadioContainer, charts])

  const weatherData = await OpenWeatherMap.weatherForecastAPI(lat, lon, unit)
  const days = [[]]

  for (let day of weatherData.list) {
    if (days[days.length - 1].length >= 8) {
      days.push([])
    }

    days[days.length - 1].push(day)
  }

  for (let i = 0; i < days.length; i++) {
    let day = days[i]

    let data = day.map((hourlyInfo) => {
      return { time: format(new Date(hourlyInfo.dt_txt), 'dd MMM H:mm'), temp: hourlyInfo.main.temp }
    })

    Dom.byId('charts').appendChild(Dom.newElement('canvas', ['chart'], `chart-${i}`))

    new Chart(Dom.byId(`chart-${i}`), {
      type: 'line',
      data: {
        labels: data.map((hour) => hour.time),
        datasets: [
          {
            label: 'Temperature [°C]',
            data: data.map((hour) => hour.temp),
          },
        ],
      },
    })
  }
}
