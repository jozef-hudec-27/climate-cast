import searchCityForm from '../components/search_city_form'
import Dom from '../dom_controller'

export default function paintHomePage() {
  Dom.byId('page-title').textContent = 'ClimateCast'

  Dom.addChildrenTo(document.body, [searchCityForm(), Dom.newElement('div', [], 'cities')])

  Dom.byId('nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault()

    Dom.clear()
    paintHomePage()
  })
}
