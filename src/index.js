import './assets/styles/style.scss'
import Dom from './dom_controller'
import paintHomePage from './pages/home'
import Favicon from './assets/images/favicon-32x32.png'

paintHomePage()

const favicon = Dom.newElement('link')
favicon.setAttribute('rel', 'icon')
favicon.setAttribute('type', 'image/x-icon')
favicon.setAttribute('href', Favicon)
document.head.appendChild(favicon)
