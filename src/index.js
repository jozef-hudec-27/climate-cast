import './assets/styles/style.scss'
import Dom from './dom_controller'
import searchCityForm from './components/search_city_form'

function paintHomePage() {
  Dom.addChildrenTo(document.body, [searchCityForm(), Dom.newElement('div', [], 'cities')])

  Dom.byId('nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault()

    Dom.clear()
    paintHomePage()
  })
}

paintHomePage()
