export default class OpenWeatherMap {
  static API_KEY = '48bceb5392f933e1b627b36faed19788'
  static prefix = 'https://api.openweathermap.org'

  static getUrlFor = (path) => {
    return `${this.prefix}${path}&appid=${this.API_KEY}`
  }

  static geoCodingAPI = async (q) => {
    // q={city name},{state code},{country code}
    const url = this.getUrlFor(`/geo/1.0/direct?q=${q}&limit=5`)

    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  static weatherForecastAPI = async (lat, lon, unit = 'metric') => {
    const url = this.getUrlFor(`/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}`)

    const response = await fetch(url)
    const data = await response.json()

    return data
  }
}
