import Chart from 'chart.js/auto'
import Dom from '../dom_controller'
import OpenWeatherMap from '../open_weather_map'

export default async function paintForecastPage(lat, lon) {
  const weatherData = await OpenWeatherMap.weatherForecastAPI(lat, lon)
  const days = [[]]

  for (let day of weatherData.list) {
    if (days[days.length - 1].length >= 8) {
      days.push([])
    }

    days[days.length - 1].push(day)
  }

  console.log(days)

  for (let i = 0; i < days.length; i++) {
    let day = days[i]

    let data = day.map((hourlyInfo) => {
      return { time: hourlyInfo.dt_txt, temp: hourlyInfo.main.temp }
    })

    console.log(`day ${i + 1}: `, data)

    // <canvas id="weather-chart"></canvas>
    Dom.byId('charts').appendChild(Dom.newElement('canvas', ['chart'], `chart-${i}`))

    new Chart(Dom.byId(`chart-${i}`), {
      type: 'line',
      data: {
        labels: data.map((hour) => hour.time),
        datasets: [
          {
            label: 'Temperature',
            data: data.map((hour) => hour.temp),
          },
        ],
      },
    })
  }

  // const data = [
  //   { year: 2010, count: 10 },
  //   { year: 2011, count: 20 },
  //   { year: 2012, count: 15 },
  //   { year: 2013, count: 25 },
  //   { year: 2014, count: 22 },
  //   { year: 2015, count: 30 },
  //   { year: 2016, count: 28 },
  // ]

  // new Chart(Dom.byId('weather-chart'), {
  //   type: 'line',
  //   data: {
  //     labels: data.map((row) => row.year),
  //     datasets: [
  //       {
  //         label: 'Acquisitions by year',
  //         data: data.map((row) => row.count),
  //       },
  //     ],
  //   },
  // })
}
