import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import MenuMain from './main/menu-main'
import Footer from './main/footer.jsx'
import Routes from './routes'
import './index.sass';
import './loader.sass';

render(
	<div>
		<BrowserRouter>
			<MenuMain />
			<Routes />
		</BrowserRouter>
		<Footer />
	</div>,
	document.querySelector('#root')
)