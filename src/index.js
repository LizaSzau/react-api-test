import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import MenuMain from './main/menu-main'
import Footer from './main/footer.jsx'
import App from './app'
import './index.sass';
import './loader.sass';

render(
	<BrowserRouter>
		<MenuMain />
		<App />
		<Footer />
	</BrowserRouter>,
	document.querySelector('#root')
)